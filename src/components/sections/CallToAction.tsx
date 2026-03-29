"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Globe } from "@/components/ui/Globe";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

export function CallToAction() {
  const ref = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up to actual backend / email service
    setSubmitted(true);
  };

  return (
    <SectionContainer mode="dark" showCornerMarks id="contact">
      <div ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text + Form column */}
          <div data-animate data-animate-index="0" className="animate-on-scroll">
            <SectionHeader
              annotation="Connect"
              heading="Let's Build the Future Together"
              dark
            />
            <p
              className="font-[family-name:var(--font-inter)] text-[18px] leading-[1.8] text-gray-medium mt-6"
              style={{ maxWidth: "720px" }}
            >
              Whether you&apos;re modernizing public services, building digital
              infrastructure, or strengthening local tech ecosystems — we&apos;re
              ready to partner with you.
            </p>

            {submitted ? (
              <div className="mt-8 border border-accent-red/30 p-6">
                <p
                  className="font-[family-name:var(--font-inter)] text-white font-semibold text-[15px]"
                >
                  Thank you for reaching out.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-gray-medium text-[14px] mt-2">
                  We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4" style={{ maxWidth: "480px" }}>
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
                    required
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
                    required
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
                    rows={4}
                    className="w-full bg-transparent border border-gray-medium/30 text-white px-4 py-3 text-[15px] font-[family-name:var(--font-inter)] placeholder:text-gray-medium/50 focus:outline-none focus:border-white transition-colors duration-200 rounded-none resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none transition-all duration-200 cursor-pointer bg-white text-blueprint-blue hover:bg-gray-lightest hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Send Message <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Globe column */}
          <div data-animate data-animate-index="1" className="animate-on-scroll flex items-center justify-center">
            <Globe />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
