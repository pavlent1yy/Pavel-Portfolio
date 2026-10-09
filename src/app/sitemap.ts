import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { enabledLocales } from "@/i18n/config";

const pages = ["", "/projects"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    enabledLocales.map((lang) => ({
      url: `${site.url}/${lang}${page}`,
      alternates: { languages: Object.fromEntries(enabledLocales.map((l) => [l, `${site.url}/${l}${page}`])) },
    })),
  );
}
