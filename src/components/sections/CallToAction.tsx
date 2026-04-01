"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { Globe } from "@/components/ui/Globe";
import { ParticleButton } from "@/components/ui/ParticleButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTextScramble } from "@/hooks/useTextScramble";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, type FormEvent } from "react";

const HEADING_TEXT = "Let's Build the Future Together";

export function CallToAction() {
  const ref = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [scrambleStarted, setScrambleStarted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Trigger scramble when heading enters viewport
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setScrambleStarted(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { displayText: headingDisplay } = useTextScramble({
    texts: [HEADING_TEXT],
    scrambleDuration: 1000,
    holdDuration: 999999,
    startResolved: !scrambleStarted,
    activeIndex: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SectionContainer mode="dark" showCornerMarks id="contact">
      <div ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text + Form column */}
          <div data-animate data-animate-index="0" className="animate-on-scroll">
            {/* Custom header with scramble effect */}
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
              ref={headingRef}
              className="font-bold mb-4 text-white"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(26px, 3vw, 36px)",
                lineHeight: "1.2",
                letterSpacing: "-0.5px",
              }}
            >
              {scrambleStarted ? headingDisplay : HEADING_TEXT}
            </h2>
            <div className="h-[3px] w-12 bg-accent-red mb-6" />

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
                <p className="font-[family-name:var(--font-inter)] text-white font-semibold text-[15px]">
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

                <ParticleButton
                  type="submit"
                  className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none transition-all duration-200 cursor-pointer bg-white text-blueprint-blue hover:bg-gray-lightest hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Send Message <ArrowRight className="ml-2 h-4 w-4" />
                </ParticleButton>
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
