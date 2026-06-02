# syntax=docker/dockerfile:1
# ─────────────────────────────────────────────────────────────────────────────
# Production image for the Arxia webpage (Next.js 16, standalone output).
# Multi-stage: deps → builder → runner. Final image runs `node server.js`.
# See DEPLOYMENT.md for the full self-hosted deploy story.
# ─────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine AS base
# libc compat for any native deps (e.g. sharp used by next/image optimization)
RUN apk add --no-cache libc6-compat

# ── deps: clean install from the lockfile ───────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── builder: compile the Next.js app ────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined at build time. The Plausible domain is the only
# one the build needs; pass it via --build-arg (empty = analytics not injected).
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN=""
ENV NEXT_PUBLIC_PLAUSIBLE_DOMAIN=${NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
ENV NEXT_TELEMETRY_DISABLED=1

# `next build` runs the TypeScript check too — a broken change fails here and
# the image never gets published. This is the build gate.
RUN npm run build

# ── runner: minimal runtime ─────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Standalone output bundles the server + only the node_modules it needs.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Server-only secrets (RESEND_API_KEY, RESEND_FROM, CONTACT_RECIPIENTS) are
# injected at runtime via the container's env_file — never baked into the image.
CMD ["node", "server.js"]
