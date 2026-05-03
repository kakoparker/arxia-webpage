"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { ParticleButton } from "@/components/ui/ParticleButton";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

export function CallToAction() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                Thank you for reaching out.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-gray-medium text-[14px] mt-2">
                We&apos;ll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-label="Contact form"
              className="space-y-4"
              style={{ maxWidth: "480px" }}
            >
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
                  Name
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
                  placeholder="Your name"
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
                  Email
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
                  placeholder="your@email.com"
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
                  Comment
                </label>
                <textarea
                  id="contact-comment"
                  name="comment"
                  required
                  aria-required="true"
                  suppressHydrationWarning
                  rows={4}
                  className="w-full bg-transparent border border-gray-medium/30 text-white px-4 py-3 text-[15px] font-[family-name:var(--font-inter)] placeholder:text-gray-medium/50 focus:outline-none focus:border-white transition-colors duration-200 rounded-none resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <ParticleButton
                type="submit"
                className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none transition-all duration-200 cursor-pointer bg-white text-blueprint-blue hover:bg-gray-lightest hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Send Message <ArrowRight className="ml-2 h-4 w-4" />
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
            Connect
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
            Let&apos;s build the future together.
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
            Whether you&apos;re modernizing public services, building digital
            infrastructure, or strengthening local tech ecosystems — we&apos;re
            ready to partner with you.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
