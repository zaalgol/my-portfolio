"use client";

import { profile } from "@/lib/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          title="Engineering depth, applied intelligence."
        />

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <p className="text-xl leading-relaxed text-white/70 md:text-2xl">
              {profile.summary}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Clean Code Advocate",
                "Cybersecurity",
                "Fintech",
                "Applied ML",
                "Mentor & Lecturer",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {profile.highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass group relative h-full overflow-hidden rounded-2xl p-6"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="gradient-text text-4xl font-bold md:text-5xl">
                    {h.value}
                  </div>
                  <div className="mt-2 text-sm text-white/55">{h.label}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
