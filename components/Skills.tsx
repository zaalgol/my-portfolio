"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      {/* divider glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Toolbox"
          title="The stack behind the work."
          description="Full-spectrum — from model training and MLOps to distributed back-ends, modern front-ends, and the cloud they run on."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass group relative h-full overflow-hidden rounded-2xl p-6"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent-indigo/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Education + certifications */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="mb-5 text-lg font-semibold text-white">
                Education
              </h3>
              <ul className="space-y-4">
                {profile.education.map((e) => (
                  <li key={e.school} className="flex justify-between gap-4">
                    <div>
                      <div className="font-medium text-white/90">
                        {e.degree}
                      </div>
                      <div className="text-sm text-white/50">{e.school}</div>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-accent">
                      {e.period}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="mb-5 text-lg font-semibold text-white">
                Certifications
              </h3>
              <ul className="space-y-3">
                {profile.certifications.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
