import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Link from "next/link";
import { themeScript } from "@/config/theme";
import "./globals.css";

const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "404",
};

export default function GlobalNotFound() {
  return (
    <html lang="ru" data-theme="light" className={onest.variable} suppressHydrationWarning>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: `<script>${themeScript}</script>` }} />
        <main
          className="container"
          style={{ display: "grid", alignContent: "center", gap: "1.25rem", minHeight: "100svh" }}
        >
          <p style={{ fontSize: "var(--fs-display)", fontWeight: 650, lineHeight: 1, letterSpacing: "-0.035em" }}>
            4<span style={{ color: "var(--accent-strong)" }}>{"{0}"}</span>4
          </p>
          <p style={{ fontSize: "var(--fs-md)", color: "var(--text-muted)" }}>
            Хмм, такой страницы тут нет.
            <br />
            Hmm, there&apos;s no such page here.
          </p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link className="btn btn-primary" href="/ru">
              На главную
            </Link>
            <Link className="btn btn-ghost" href="/en" lang="en">
              Home page
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
