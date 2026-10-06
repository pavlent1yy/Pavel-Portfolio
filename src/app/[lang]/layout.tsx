import type { Metadata } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { plain } from "@/content/types";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SmoothScroll } from "@/components/SmoothScroll";
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

const themeScript = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(light|dark)/);if(m)document.documentElement.setAttribute("data-theme",m[1])}catch(e){}})()`;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { content } = getDictionary(lang);
  return {
    title: site.name[lang],
    description: plain(content.meta.description) || undefined,
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
      </body>
    </html>
  );
}
