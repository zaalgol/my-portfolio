"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/profile";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px] glow-conic"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow justify-center">
            <span className="h-px w-8 bg-accent/60" />
            Contact
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Let&apos;s build something{" "}
            <span className="gradient-text">exceptional.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
            Open to senior software engineering and ML/DL opportunities,
            consulting, and collaboration. The fastest way to reach me is email
            or LinkedIn.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ink-950 transition-transform hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
            >
              <Linkedin className="h-5 w-5" />
              Connect on LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5 text-sm text-white/50">
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Phone className="h-4 w-4" />
              {profile.phone}
            </a>
            <span className="h-4 w-px bg-white/15" />
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
