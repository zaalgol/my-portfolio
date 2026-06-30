import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md glow-conic font-mono text-[11px] font-bold text-ink-950">
            ZG
          </span>
          <span>
            © {profile.name}. Designed &amp; built with Next.js.
          </span>
        </div>
        <div className="font-mono text-xs">
          Crafted in {profile.location} · Enterprise meets edgy
        </div>
      </div>
    </footer>
  );
}
