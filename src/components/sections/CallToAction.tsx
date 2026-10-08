"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { ParticleButton } from "@/components/ui/ParticleButton";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type FormEvent } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "error"; message: string }
  | { status: "success" };

type FieldId = "name" | "email" | "comment";
type FieldErrors = Partial<Record<FieldId, string>>;

/** Server error codes (see /api/contact) → ContactForm message keys. */
const SERVER_ERRORS: Record<string, string> = {
  name: "errorName",
  email: "errorEmail",
  comment: "errorComment",
  rate_limited: "errorRateLimited",
  unavailable: "errorUnavailable",
  send_failed: "errorGeneric",
  invalid_request: "errorGeneric",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Must match HONEYPOT_FIELD in /api/contact. */
const HONEYPOT_FIELD = "hp_extra";

const mono = "font-[family-name:var(--font-jetbrains)] uppercase";

/** Dark-surface field: filled, not just outlined, so the inputs read as
 *  inputs against the grid. Focus brightens the border and lifts the fill. */
const fieldClass =
  "peer w-full rounded-none border border-white/15 bg-white/[0.04] px-4 py-3 font-[family-name:var(--font-inter)] text-[15px] text-white placeholder:text-gray-medium/80 transition-colors duration-200 hover:border-white/30 focus:border-white focus:bg-white/[0.07] focus:outline-none aria-[invalid=true]:border-accent-red-bright";

/**
 * Homepage contact section.
 *
 * Reading order is pitch first, form second: the claim on the left, the form on the right as a framed panel — a plate with a
 * standing red rule, a mono header strip and corner ticks, lit by a soft
 * Blueprint glow so it is the brightest object on the dark grid. The submit
 * is the site's primary action button (white on dark; red stays a mark,
 * never a fill). The API contract (name, email, comment,
 * honeypot) is unchanged.
 */
export function CallToAction() {
  const t = useTranslations("ContactForm");
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const commentRef = useRef<HTMLTextAreaElement>(null);

  // Arriving from a domain page ("/?topic=…#contact"): seed the message with
  // the topic so the enquiry keeps its context. Only fills an empty field.
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic")?.trim().slice(0, 80);
    const el = commentRef.current;
    if (topic && el && !el.value) el.value = t("topicPrefill", { topic });
  }, [t]);

  const validate = (p: Record<FieldId, string>): FieldErrors => {
    const errors: FieldErrors = {};
    if (!p.name) errors.name = t("errorName");
    if (!p.email || !EMAIL_RE.test(p.email)) errors.email = t("errorEmail");
    if (!p.comment) errors.comment = t("errorComment");
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: (data.get("name") ?? "").toString().trim(),
      email: (data.get("email") ?? "").toString().trim(),
      comment: (data.get("comment") ?? "").toString().trim(),
      // Honeypot — bots fill every input; real users never see this field.
      [HONEYPOT_FIELD]: (data.get(HONEYPOT_FIELD) ?? "").toString(),
    };

    const errors = validate(payload);
    setFieldErrors(errors);
    const firstInvalid = (Object.keys(errors) as FieldId[])[0];
    if (firstInvalid) {
      setState({ status: "idle" });
      form.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }

    setState({ status: "pending" });
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
      };
      if (r.ok && json.ok) {
        setState({ status: "success" });
        form.reset();
        return;
      }
      // A 429 can come from the Vercel Firewall rate-limit rule (its own JSON
      // shape, no `code`) as well as from the route itself.
      const key =
        r.status === 429
          ? "errorRateLimited"
          : (json.code && SERVER_ERRORS[json.code]) || "errorGeneric";
      if (json.code === "name" || json.code === "email" || json.code === "comment") {
        setFieldErrors({ [json.code]: t(key) });
        form.querySelector<HTMLElement>(`#contact-${json.code}`)?.focus();
        setState({ status: "idle" });
        return;
      }
      setState({ status: "error", message: t(key) });
    } catch {
      setState({
        status: "error",
        message: t("errorNetwork"),
      });
    }
  };

  const submitted = state.status === "success";
  const pending = state.status === "pending";
  const errorMessage = state.status === "error" ? state.message : null;

  const fields = [
    { id: "name", type: "text", autoComplete: "name" },
    { id: "email", type: "email", autoComplete: "email" },
  ] as const;

  return (
    <SectionContainer mode="dark" showCornerMarks id="contact" fitScreen>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── Left: the pitch ─────────────────────────────────────────────── */}
        <div className="lg:col-span-6">
          <p className={`${mono} mb-4 text-[11px] leading-[1.2] tracking-[2.5px] text-accent-red-bright`}>
            {t("connect")}
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-primary)",
              fontWeight: 700,
              fontSize: "clamp(34px, 4.2vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
            }}
          >
            {t("heading")}
          </h2>
          <div className="mt-6 h-[3px] w-12 bg-accent-red" />
          <p
            className="mt-6 text-gray-light"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(16px, 1.3vw, 18px)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            {t("body")}
          </p>
        </div>

        {/* ── Right: the form, as a lit panel ──────────────────────────── */}
        <div className="relative lg:col-span-6">
          {/* Soft Blueprint glow so the panel lifts off the grid. */}
          <div
            aria-hidden
            // Kept inside the column horizontally so it can never cause a
            // sideways scroll on phones.
            className="pointer-events-none absolute inset-x-0 -inset-y-10 opacity-90"
            style={{
              background:
                "radial-gradient(60% 55% at 55% 45%, rgba(46, 72, 128, 0.45), transparent 70%)",
            }}
          />

          <div className="relative border border-white/15 bg-[#111b2b]/90 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            {/* Standing red rule + corner ticks: a drawn plate, not a box. */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-accent-red" />
            <span aria-hidden className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-white/30" />
            <span aria-hidden className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-white/30" />

            {/* Header strip */}
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4 sm:px-8">
              <span aria-hidden className="h-[6px] w-[6px] bg-accent-red" />
              <p className={`${mono} text-[10px] tracking-[2px] text-white`}>{t("formTitle")}</p>
              <span aria-hidden className="h-px flex-1 border-t border-dashed border-white/15" />
              <p aria-hidden className={`${mono} text-[10px] tracking-[2px] text-gray-medium`}>
                arxia.global
              </p>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-7">
              {submitted ? (
                <div role="status" aria-live="polite" className="py-6">
                  <span className="flex h-12 w-12 items-center justify-center border border-accent-red text-accent-red-bright">
                    <Check aria-hidden size={22} strokeWidth={2} />
                  </span>
                  <p
                    className="mt-5 font-semibold text-white"
                    style={{ fontFamily: "var(--font-primary)", fontSize: "22px", lineHeight: 1.25 }}
                  >
                    {t("successTitle")}
                  </p>
                  <p className="mt-2 text-gray-medium" style={{ fontFamily: "var(--font-primary)", fontSize: "15px" }}>
                    {t("successBody")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setState({ status: "idle" })}
                    className={`${mono} mt-6 text-[11px] tracking-[2px] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline`}
                  >
                    {t("successNext")} →
                  </button>
                </div>
              ) : (
                <form method="post" onSubmit={handleSubmit} aria-label={t("ariaLabel")} className="space-y-5" noValidate>
                  {/* method="post": if the form is submitted before hydration, the
                      browser must not put the visitor's details in the URL. */}
                  {/* Honeypot — visually hidden, autofill-suppressed. Bots fill it;
                      the API drops the submission silently when it's non-empty. */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Meaningless name + explicit instruction, so neither
                        browser autofill nor an assistive agent filling the form
                        for a real person trips it and loses the enquiry. */}
                    <label htmlFor={`contact-${HONEYPOT_FIELD}`}>{t("honeypotLabel")}</label>
                    <input
                      id={`contact-${HONEYPOT_FIELD}`}
                      name={HONEYPOT_FIELD}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {fields.map((f, i) => (
                      <div key={f.id}>
                        <label
                          htmlFor={`contact-${f.id}`}
                          className={`${mono} mb-2 flex items-center gap-2 text-[10px] tracking-[2px] text-gray-light`}
                        >
                          <span aria-hidden className="text-gray-medium">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {t(f.id)}
                        </label>
                        <input
                          id={`contact-${f.id}`}
                          name={f.id}
                          type={f.type}
                          autoComplete={f.autoComplete}
                          required
                          aria-required="true"
                          aria-invalid={fieldErrors[f.id] ? true : undefined}
                          aria-describedby={fieldErrors[f.id] ? `contact-${f.id}-error` : undefined}
                          onInput={() =>
                            fieldErrors[f.id] && setFieldErrors((e) => ({ ...e, [f.id]: undefined }))
                          }
                          suppressHydrationWarning
                          className={fieldClass}
                          placeholder={t(`${f.id}Placeholder`)}
                        />
                        <FieldError id={`contact-${f.id}-error`} message={fieldErrors[f.id]} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-comment"
                      className={`${mono} mb-2 flex items-center gap-2 text-[10px] tracking-[2px] text-gray-light`}
                    >
                      <span aria-hidden className="text-gray-medium">03</span>
                      {t("comment")}
                    </label>
                    <textarea
                      ref={commentRef}
                      id="contact-comment"
                      name="comment"
                      required
                      aria-required="true"
                      aria-invalid={fieldErrors.comment ? true : undefined}
                      aria-describedby={fieldErrors.comment ? "contact-comment-error" : undefined}
                      onInput={() =>
                        fieldErrors.comment && setFieldErrors((e) => ({ ...e, comment: undefined }))
                      }
                      suppressHydrationWarning
                      rows={5}
                      className={`${fieldClass} resize-none`}
                      placeholder={t("commentPlaceholder")}
                    />
                    <FieldError id="contact-comment-error" message={fieldErrors.comment} />
                  </div>

                  {errorMessage && (
                    <p
                      role="alert"
                      className="border-l-2 border-accent-red bg-accent-red/10 px-4 py-2.5 font-[family-name:var(--font-inter)] text-[14px] text-white"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <ParticleButton
                      type="submit"
                      disabled={pending}
                      aria-busy={pending}
                      className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-none bg-white px-8 py-3.5 font-[family-name:var(--font-inter)] text-[14px] font-semibold uppercase tracking-[1.5px] text-blueprint-dark transition-all duration-200 hover:-translate-y-px hover:bg-gray-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {pending ? t("sending") : t("send")}
                      {!pending && (
                        <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      )}
                    </ParticleButton>
                    <p
                      className="text-gray-medium sm:max-w-[220px] sm:text-right"
                      style={{ fontFamily: "var(--font-primary)", fontSize: "12px", lineHeight: 1.5 }}
                    >
                      {t("privacyNote")}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

/** Inline field error, linked to its input via aria-describedby. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 font-[family-name:var(--font-inter)] text-[13px] text-accent-red-bright">
      {message}
    </p>
  );
}
