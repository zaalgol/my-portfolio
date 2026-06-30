"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin } from "lucide-react";
import { profile } from "@/lib/profile";
import { SectionHeading } from "./SectionHeading";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
  });

  return (
    <section id="journey" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Career Journey"
          title="A decade of building, shipping & teaching."
          description="From SAP integrations to DAG cryptocurrencies, web isolation gateways to real-time ML threat detection — and the classroom in between."
        />

        <div ref={ref} className="relative">
          {/* Track */}
          <div className="absolute left-[19px] top-2 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          {/* Animated progress */}
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-[19px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent-cyan via-accent to-accent-indigo md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10 md:space-y-16">
            {profile.experience.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={job.company + job.period}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative pl-14 md:w-1/2 md:pl-0 ${
                    left
                      ? "md:pr-14 md:text-right"
                      : "md:ml-auto md:pl-14"
                  }`}
                >
                  {/* Node */}
                  <span
                    className={`absolute top-2 flex h-4 w-4 items-center justify-center left-3 md:left-auto ${
                      left ? "md:-right-2" : "md:-left-2"
                    }`}
                  >
                    {job.current && (
                      <span className="absolute h-4 w-4 rounded-full bg-accent/40 animate-pulse-ring" />
                    )}
                    <span
                      className={`relative h-3.5 w-3.5 rounded-full border-2 ${
                        job.current
                          ? "border-accent bg-accent"
                          : "border-white/30 bg-ink-900"
                      }`}
                    />
                  </span>

                  <div className="glass group rounded-2xl p-6 transition-colors hover:border-accent/30">
                    <div
                      className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${
                        left ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="font-mono text-xs uppercase tracking-wider text-accent">
                        {job.period}
                      </span>
                      {job.current && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                          Now
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {job.role}
                    </h3>
                    <div
                      className={`flex flex-wrap items-center gap-2 text-sm text-white/60 ${
                        left ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="font-medium text-accent-indigo">
                        {job.company}
                      </span>
                      <span className="inline-flex items-center gap-1 text-white/40">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {job.summary}
                    </p>

                    <div
                      className={`mt-4 flex flex-wrap gap-2 ${
                        left ? "md:justify-end" : ""
                      }`}
                    >
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
