"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work — coming soon."
          description="A curated set of case studies is on the way. Here's a preview of the kind of systems I build and ship."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {profile.portfolio.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-5 flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-accent">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-white/40">
                    {p.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                  {p.blurb}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-white/55"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <span className="mt-5 inline-flex items-center gap-1 text-sm text-white/40 transition-colors group-hover:text-accent">
                  Case study soon
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Want the full story?
              </h3>
              <p className="text-sm text-white/55">
                Detailed write-ups, code and demos are in progress. In the
                meantime, my LinkedIn has the complete picture.
              </p>
            </div>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-105"
            >
              View LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
