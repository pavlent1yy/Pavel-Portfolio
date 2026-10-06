import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { ui } from "@/i18n/ui";

export const alt = site.name.ru;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const fonts = [
  { file: "onest-latin-400-normal.woff", weight: 400 },
  { file: "onest-cyrillic-400-normal.woff", weight: 400 },
  { file: "onest-latin-600-normal.woff", weight: 600 },
  { file: "onest-cyrillic-600-normal.woff", weight: 600 },
] as const;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : defaultLocale;
  const data = await Promise.all(
    fonts.map(async ({ file, weight }) => ({
      name: "Onest",
      data: await readFile(join(process.cwd(), "node_modules/@fontsource/onest/files", file)),
      weight,
      style: "normal" as const,
    })),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background: "#2e2522",
          color: "#efe2d9",
          fontFamily: "Onest",
        }}
      >
        <div style={{ display: "flex", width: 64, height: 6, background: "#e3a568", borderRadius: 3 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 112, fontWeight: 600, lineHeight: 1, letterSpacing: -3 }}>{site.name[lang]}</div>
          <div style={{ fontSize: 56, color: "#e3a568" }}>{ui[lang].role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#b8a49a" }}>{`github.com/${site.contacts.github.handle}`}</div>
      </div>
    ),
    {
      ...size,
      fonts: data,
    },
  );
}
