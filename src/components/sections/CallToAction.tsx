"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { ParticleButton } from "@/components/ui/ParticleButton";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "error"; message: string }
  | { status: "success" };

export function CallToAction() {
  const t = useTranslations("ContactForm");
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot — bots fill every input; real users never see this field.
    const honeypot = (data.get("website") ?? "").toString();
    const payload = {
      name: (data.get("name") ?? "").toString().trim(),
      email: (data.get("email") ?? "").toString().trim(),
      comment: (data.get("comment") ?? "").toString().trim(),
      website: honeypot,
    };

    setState({ status: "pending" });
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (r.ok && json.ok) {
        setState({ status: "success" });
        form.reset();
        return;
      }
      setState({
        status: "error",
        message: json.error ?? t("errorGeneric"),
      });
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

  return (
    <SectionContainer mode="dark" showCornerMarks id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — form (or success state) */}
        <div>
          {submitted ? (
            <div
              className="border border-accent-red/30 p-6"
              role="status"
              aria-live="polite"
              style={{ maxWidth: "480px" }}
            >
              <p className="font-[family-name:var(--font-inter)] text-white font-semibold text-[15px]">
                {t("successTitle")}
              </p>
              <p className="font-[family-name:var(--font-inter)] text-gray-medium text-[14px] mt-2">
                {t("successBody")}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-label={t("ariaLabel")}
              className="space-y-4"
              style={{ maxWidth: "480px" }}
              noValidate
            >
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
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block mb-1.5 uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "2.5px",
                    lineHeight: "1.2",
                    color: "var(--gray-medium)",
                  }}
                >
                  {t("name")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  suppressHydrationWarning
                  className="w-full bg-transparent border border-gray-medium/30 text-white px-4 py-3 text-[15px] font-[family-name:var(--font-inter)] placeholder:text-gray-medium/50 focus:outline-none focus:border-white transition-colors duration-200 rounded-none"
                  placeholder={t("namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block mb-1.5 uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "2.5px",
                    lineHeight: "1.2",
                    color: "var(--gray-medium)",
                  }}
                >
                  {t("email")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  suppressHydrationWarning
                  className="w-full bg-transparent border border-gray-medium/30 text-white px-4 py-3 text-[15px] font-[family-name:var(--font-inter)] placeholder:text-gray-medium/50 focus:outline-none focus:border-white transition-colors duration-200 rounded-none"
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-comment"
                  className="block mb-1.5 uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "2.5px",
                    lineHeight: "1.2",
                    color: "var(--gray-medium)",
                  }}
                >
                  {t("comment")}
                </label>
                <textarea
                  id="contact-comment"
                  name="comment"
                  required
                  aria-required="true"
                  suppressHydrationWarning
                  rows={4}
                  className="w-full bg-transparent border border-gray-medium/30 text-white px-4 py-3 text-[15px] font-[family-name:var(--font-inter)] placeholder:text-gray-medium/50 focus:outline-none focus:border-white transition-colors duration-200 rounded-none resize-none"
                  placeholder={t("commentPlaceholder")}
                />
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="font-[family-name:var(--font-inter)] text-accent-red text-[14px]"
                >
                  {errorMessage}
                </p>
              )}

              <ParticleButton
                type="submit"
                disabled={pending}
                aria-busy={pending}
                className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none transition-all duration-200 cursor-pointer bg-white text-blueprint-blue hover:bg-gray-lightest hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {pending ? t("sending") : t("send")}
                {!pending && <ArrowRight className="ml-2 h-4 w-4" />}
              </ParticleButton>
            </form>
          )}
        </div>

        {/* Right — static phrase */}
        <div>
          <p
            className="font-normal uppercase mb-4 text-accent-red/85"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "2.5px",
              lineHeight: "1.2",
            }}
          >
            {t("connect")}
          </p>
          <h2
            className="font-bold mb-4 text-white"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(28px, 3.2vw, 40px)",
              lineHeight: "1.15",
              letterSpacing: "-0.5px",
            }}
          >
            {t("heading")}
          </h2>
          <div className="h-[3px] w-12 bg-accent-red mb-6" />
          <p
            className="font-[family-name:var(--font-inter)] text-gray-light"
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              maxWidth: "480px",
            }}
          >
            {t("body")}
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
