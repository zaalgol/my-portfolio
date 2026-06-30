import { NextRequest } from "next/server";
import { profile } from "@/lib/profile";

export const runtime = "nodejs";

// Build a rich persona prompt from the single source of truth (lib/profile.ts)
function buildSystemPrompt() {
  const experience = profile.experience
    .map(
      (e) =>
        `- ${e.role} @ ${e.company} (${e.period}, ${e.location})${
          e.current ? " [current]" : ""
        }: ${e.summary} Tech: ${e.tags.join(", ")}.`
    )
    .join("\n");

  const skills = profile.skillGroups
    .map((g) => `- ${g.title}: ${g.items.join(", ")}`)
    .join("\n");

  const education = profile.education
    .map((e) => `- ${e.degree}, ${e.school} (${e.period})`)
    .join("\n");

  return `You are the "Digital Twin" of ${profile.name} — an AI persona that speaks AS ${profile.name}, in the first person ("I", "my"), to visitors of his portfolio website.

Your job: answer questions about ${profile.shortName}'s career, experience, skills, projects, and professional background warmly, confidently, and concisely.

# Identity
- Name: ${profile.name}
- Roles: ${profile.roles.join(", ")}
- Location: ${profile.location}
- Summary: ${profile.summary}

# Experience
${experience}

# Skills
${skills}

# Education
${education}

# Certifications
${profile.certifications.join("; ")}

# Style & rules
- Speak in the first person as ${profile.shortName}. Be friendly, professional, and a little sharp — "enterprise meets edgy".
- Keep answers concise (usually 2-5 sentences). Use short lists when helpful.
- Ground every claim in the facts above. If you don't know something (e.g. salary expectations, exact unlisted dates, personal/private matters), say so honestly and offer to connect via email (${profile.email}) or LinkedIn.
- Never invent employers, titles, dates, or technologies that aren't listed.
- If asked something off-topic or inappropriate, gently steer back to career and professional topics.
- You may encourage interested recruiters/collaborators to reach out via the contact section.`;
}

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

// Streaming-safe filter that drops <think>...</think> blocks some reasoning
// models still emit in their content, handling tags split across chunks.
function makeThinkStripper() {
  let inThink = false;
  let carry = "";
  const OPEN = "<think>";
  const CLOSE = "</think>";

  // Longest suffix of `s` that is a prefix of `tag` (a possible partial tag).
  const partial = (s: string, tag: string) => {
    const max = Math.min(s.length, tag.length - 1);
    for (let n = max; n > 0; n--) {
      if (tag.startsWith(s.slice(s.length - n))) return n;
    }
    return 0;
  };

  return (text: string): string => {
    carry += text;
    let out = "";
    while (carry.length) {
      if (!inThink) {
        const open = carry.indexOf(OPEN);
        if (open === -1) {
          const hold = partial(carry, OPEN);
          out += carry.slice(0, carry.length - hold);
          carry = carry.slice(carry.length - hold);
          break;
        }
        out += carry.slice(0, open);
        carry = carry.slice(open + OPEN.length);
        inThink = true;
      } else {
        const close = carry.indexOf(CLOSE);
        if (close === -1) {
          const hold = partial(carry, CLOSE);
          carry = carry.slice(carry.length - hold);
          break;
        }
        carry = carry.slice(close + CLOSE.length);
        inThink = false;
      }
    }
    return out;
  };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server is missing OPENROUTER_API_KEY." },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  // Only keep user/assistant turns from the client; cap history to keep it cheap.
  const history = incoming
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-12)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    ...history,
  ];

  let upstream: Response;
  try {
    upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        // Header values must be Latin-1 (ASCII) — avoid em dashes / non-ASCII here.
        "X-Title": "Zalman Goldstein Digital Twin",
      },
      body: JSON.stringify({
        // Auto-routes across all currently-available free models for resilience.
        model: "openrouter/free",
        // Suppress chain-of-thought from reasoning models so only the answer streams.
        reasoning: { exclude: true },
        messages,
        stream: true,
        temperature: 0.6,
        max_tokens: 700,
      }),
    });
  } catch (err) {
    const e = err as { name?: string; message?: string; cause?: { code?: string } };
    const code = e?.cause?.code || e?.name || "unknown";
    console.error("[chat] fetch to OpenRouter failed:", code, e?.message, e?.cause);
    return Response.json(
      {
        error: "Could not reach OpenRouter.",
        detail: `${code}: ${e?.message ?? ""}`.slice(0, 300),
      },
      { status: 502 }
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    const friendly =
      upstream.status === 429
        ? "The free AI model is busy right now (shared rate limit). Please try again in a few seconds."
        : "I couldn't reach the AI model just now. Please try again shortly.";
    return Response.json(
      { error: friendly, detail: detail.slice(0, 500) },
      { status: upstream.status || 502 }
    );
  }

  // Parse the OpenRouter SSE stream and re-emit plain-text deltas to the client.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const strip = makeThinkStripper();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const raw of lines) {
            const line = raw.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                const clean = strip(delta);
                if (clean) controller.enqueue(encoder.encode(clean));
              }
            } catch {
              // Ignore keep-alive comments / partial JSON
            }
          }
        }
      } catch {
        // Stream interrupted; just close.
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
