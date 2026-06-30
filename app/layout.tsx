import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — Software & ML/DL Engineer`,
  description: profile.summary,
  keywords: [
    "Zalman Goldstein",
    "Software Engineer",
    "Machine Learning Engineer",
    "RAG",
    "LangChain",
    "Next.js",
    "Israel",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Software & ML/DL Engineer`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
