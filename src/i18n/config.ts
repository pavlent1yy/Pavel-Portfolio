export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const enabledLocales: readonly Locale[] = ["ru"];

export const defaultLocale: Locale = "ru";

export const cisCountries = ["RU", "BY", "KZ", "KG", "TJ", "UZ", "AM", "AZ", "MD", "TM"];

export const cisLanguages = ["ru", "be", "uk", "kk", "ky", "uz", "tg", "hy", "az", "tk"];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const isEnabled = (value: string): value is Locale =>
  (enabledLocales as readonly string[]).includes(value);

export const otherLocale = (locale: Locale): Locale => (locale === "ru" ? "en" : "ru");
