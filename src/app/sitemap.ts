import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/i18n/config";

const pages = ["", "/projects"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${page}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${page}`])) },
    })),
  );
}
