"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/profile";

function RotatingRole() {
  return (
    <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom">
      <motion.span
        className="flex flex-col"
        animate={{ y: ["0%", "-33.333%", "-66.666%", "0%"] }}
        transition={{
          duration: 7.5,
          times: [0, 0.33, 0.66, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {[...profile.roles, profile.roles[0]].map((r, i) => (
          <span key={i} className="gradient-text whitespace-nowrap font-semibold">
            {r}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* Animated backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <motion.div
          className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px] glow-conic"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute right-[-10%] top-1/3 h-72 w-72 rounded-full bg-accent-indigo/20 blur-[110px]" />
        <div className="absolute bottom-0 left-[-5%] h-72 w-72 rounded-full bg-accent-cyan/20 blur-[110px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.04]" />
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for senior engineering &amp; ML roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 text-2xl font-medium text-white/80 sm:text-3xl md:text-4xl"
        >
          <RotatingRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#journey"
            className="group relative overflow-hidden rounded-full bg-white px-6 py-3 font-medium text-ink-950 transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Explore my journey</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </a>
          <a
            href="#contact"
            className="rounded-full glass px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            Get in touch
          </a>

          <div className="ml-1 flex items-center gap-1">
            {[
              { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              { icon: Github, href: profile.github, label: "GitHub" },
              { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full glass text-white/70 transition-all hover:scale-110 hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex items-center gap-2 text-sm text-white/40"
        >
          <MapPin className="h-4 w-4" />
          {profile.location}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
