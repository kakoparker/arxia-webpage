# Deploying www.arxia.com (self-hosted, auto-deploy)

This repo ships with everything needed to run the site on an Arxia server and
**auto-deploy on every change**. An engineer does the one-time setup below; after
that, content edits pushed to `main` build and go live on their own — no manual
deploy step, ever.

```
 push to main ──▶ GitHub Actions (deploy.yml)
                    │  1. build production Docker image   ← `next build` = build gate
                    │  2. push image to GHCR
                    └▶ 3. SSH to server: docker compose pull && up -d
                                                   │
                              Caddy (TLS, :443) ──▶ Next.js container (:3000)
                                                   │
                                          https://www.arxia.com  (live ~1–2 min)
```

A broken change can't reach production: the image build runs `next build`
(which type-checks), and if it fails the old container keeps serving.

---

## Prerequisites (server)

- A Linux server reachable on ports **80** and **443**.
- **Docker** + **Docker Compose v2** (`docker compose version`).
- DNS for **`www.arxia.com`** and **`arxia.com`** pointing (A/AAAA) at this server.
  > When you cut over from the current site, point DNS here. TLS is issued
  > automatically by Caddy once DNS resolves — no manual certificate steps.

---

## One-time setup

### 1. Put the deploy files on the server

```bash
sudo mkdir -p /opt/arxia-webpage && cd /opt/arxia-webpage
# Copy these three files from the repo root to here:
#   docker-compose.yml   Caddyfile   .env.example
curl -fsSLO https://raw.githubusercontent.com/kakoparker/arxia-webpage/main/docker-compose.yml
curl -fsSLO https://raw.githubusercontent.com/kakoparker/arxia-webpage/main/Caddyfile
curl -fsSLO https://raw.githubusercontent.com/kakoparker/arxia-webpage/main/.env.example
```

### 2. Create the runtime secrets

```bash
cp .env.example .env
# Edit .env — set the production values:
#   RESEND_API_KEY=...                 (verify arxia.com in Resend first)
#   RESEND_FROM="Arxia <contact@arxia.com>"
#   CONTACT_RECIPIENTS=carlos.parker@arxia.com,daniel.homorodean@arxia.com   (optional)
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN is a BUILD-time var — set it in GitHub (step 4),
# not here.
```

These are injected into the container at runtime and are never baked into the
image.

### 3. Make the GHCR image pullable

The CD pipeline publishes `ghcr.io/kakoparker/arxia-webpage`. Easiest path:
make that package **public** (Repo → Packages → package → Settings → change
visibility to Public). The image contains no secrets, so this is safe.

> Prefer a private package? Run `docker login ghcr.io` on the server with a PAT
> that has `read:packages`, then proceed.

### 4. Configure GitHub (Settings → Secrets and variables → Actions)

**Secrets:**
| Name | Value |
| --- | --- |
| `SSH_HOST` | server hostname / IP |
| `SSH_USER` | deploy user (must be able to run `docker` in `/opt/arxia-webpage`) |
| `SSH_KEY` | private SSH key for that user (matching public key in `~/.ssh/authorized_keys`) |

**Variables:**
| Name | Value |
| --- | --- |
| `DEPLOY_ENABLED` | `true` |
| `PLAUSIBLE_DOMAIN` | `arxia.com` (or leave unset to skip analytics) |

> `DEPLOY_ENABLED` is the master switch. Until it's `true`, `deploy.yml` is
> dormant and pushes to `main` are only validated (CI build + typecheck).

### 5. First boot

```bash
cd /opt/arxia-webpage
docker compose pull        # pulls the latest published image
docker compose up -d       # starts web + Caddy; Caddy gets TLS automatically
docker compose logs -f     # watch it come up; visit https://www.arxia.com
```

From here on, every push to `main` redeploys automatically.

---

## How content updates work (for Carlos)

Nothing technical. In a Claude session: *"add this news / change this text / swap
this image."* Claude edits the content data files, pushes to `main`, the pipeline
rebuilds and deploys, and the change is live in ~1–2 minutes. The engineer is not
involved.

Content lives in plain data files (`src/data/*.ts` + the `src/data/i18n/*`
overlays), so edits are low-risk and the build gate catches any mistake before it
ships.

---

## Rollback

Images are tagged `:latest` and `:<commit-sha>`. To revert to a known-good build:

```bash
cd /opt/arxia-webpage
# find the previous good sha from GitHub Actions or `docker images`
docker compose down
IMAGE_TAG=<previous-sha> docker compose up -d   # or edit docker-compose.yml's image tag
```

Or simply revert the offending commit on `main` — the pipeline redeploys the
restored version.

---

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Deploy didn't run | Is `DEPLOY_ENABLED` set to `true`? Look at the Actions tab. |
| TLS not issued | Do `www.arxia.com` / `arxia.com` resolve to this server? Are 80/443 open? `docker compose logs caddy`. |
| Contact form errors | `RESEND_API_KEY` / `RESEND_FROM` set in `/opt/arxia-webpage/.env`? Domain verified in Resend? |
| Image won't pull | Is the GHCR package public, or did you `docker login ghcr.io`? |
| Build fails in Actions | Open the failing run — it's a real `next build`/type error; fix on a branch, the gate did its job. |

> Note: every push to `main` builds the Docker image in Actions (validating the
> Dockerfile + running `next build`). The image is only pushed to GHCR and
> deployed when `DEPLOY_ENABLED` is `true`, so the build is always exercised but
> nothing reaches production until you turn it on.
