"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, User, X } from "lucide-react";
import { profile } from "@/lib/profile";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What do you do at DealSumm?",
  "Tell me about your ML experience.",
  "Why should I hire you?",
  "What's your strongest tech stack?",
];

const GREETING: Msg = {
  role: "assistant",
  content: `Hi — I'm ${profile.shortName}'s digital twin. Ask me anything about my career, projects, or skills.`,
};

export function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Add an empty assistant message we'll stream into.
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        let msg = `Sorry — I hit a snag connecting. You can always reach me at ${profile.email}.`;
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
          if (data?.detail) msg += `\n\n(${data.detail})`;
        } catch {
          /* keep default */
        }
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: msg };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }

      if (!acc.trim()) {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content:
              "Hmm, I couldn't generate a reply just now. Please try again in a moment.",
          };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: `Sorry — I hit a snag connecting. You can always reach me at ${profile.email}.`,
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with my digital twin"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full bg-white px-4 py-3 font-medium text-ink-950 shadow-xl shadow-black/40 md:bottom-7 md:right-7"
      >
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full glow-conic">
          <Sparkles className="h-3.5 w-3.5 text-ink-950" />
        </span>
        <span className="hidden sm:inline">Ask my AI twin</span>
        <span className="sm:hidden">AI twin</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              className="fixed inset-x-3 bottom-3 z-[80] flex h-[78vh] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/95 shadow-2xl shadow-black/60 backdrop-blur-2xl sm:inset-x-auto sm:bottom-7 sm:right-7 sm:h-[34rem] sm:w-[26rem]"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <div className="flex items-center gap-3">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-xl glow-conic text-ink-950">
                    <Bot className="h-5 w-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {profile.shortName}&apos;s Digital Twin
                    </div>
                    <div className="text-xs text-emerald-400">
                      Online · AI persona
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 ${
                      m.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        m.role === "user"
                          ? "bg-white/10 text-white"
                          : "glow-conic text-ink-950"
                      }`}
                    >
                      {m.role === "user" ? (
                        <User className="h-3.5 w-3.5" />
                      ) : (
                        <Bot className="h-3.5 w-3.5" />
                      )}
                    </span>
                    <div
                      className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-tr-sm bg-white text-ink-950"
                          : "rounded-tl-sm border border-white/10 bg-white/[0.04] text-white/85"
                      }`}
                    >
                      {m.content || (
                        <span className="inline-flex gap-1">
                          <Dot /> <Dot d={0.15} /> <Dot d={0.3} />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions (only before first user message) */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 px-4 pb-3">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-accent/40 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-white/10 p-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my career…"
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-accent/50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink-950 transition-opacity disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-white/50"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay: d }}
    />
  );
}
