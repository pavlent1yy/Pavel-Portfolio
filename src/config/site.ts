import type { LogoVariant } from "@/components/Logo";

export const site = {
  name: { ru: "Павел Хухарев", en: "Pavel Khuharev" },
  logo: { ru: "braces", en: "xyxar" } as Record<"ru" | "en", LogoVariant>,
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
  timeZone: "Europe/Moscow",
  birthDate: "2007-08-15",
  resume: "",
  contacts: {
    telegram: { handle: "@pavlentiyy1", url: "https://t.me/pavlentiyy1" },
    email: "phuharev@gmail.com",
    github: { handle: "pavlent1yy", url: "https://github.com/pavlent1yy" },
    vk: { url: "" },
    linkedin: { url: "" },
  },
  presence: ["telegram", "vk", "github", "linkedin"] as const,
};
