import { en } from "@/content/en";
import { ru } from "@/content/ru";
import type { Content } from "@/content/types";
import type { Locale } from "./config";
import { ui, type Ui } from "./ui";

const contents: Record<Locale, Content> = { ru, en };

export const getDictionary = (locale: Locale): { content: Content; ui: Ui } => ({
  content: contents[locale],
  ui: ui[locale],
});
