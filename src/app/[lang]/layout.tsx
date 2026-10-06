import type { Metadata } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { plain } from "@/content/types";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { themeScript } from "@/config/theme";
import "../globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});


export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { content, ui } = getDictionary(lang);
  const title = `${site.name[lang]} — ${ui.role}`;
  const description = plain(content.meta.description) || undefined;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name[lang]}` },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: { type: "website", locale: lang, title, description, siteName: site.name[lang] },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      data-theme="light"
      className={`${onest.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: `<script>${themeScript}</script>` }} />
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
