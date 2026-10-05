"use client";

import { useParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { site } from "@/config/site";
import { hasLocale, defaultLocale } from "@/i18n/config";
import { ui } from "@/i18n/ui";

const subscribe = () => () => {};

function ageAt(now: Date) {
  const [year, month, day] = site.birthDate.split("-").map(Number);
  const hadBirthday = now.getMonth() + 1 > month || (now.getMonth() + 1 === month && now.getDate() >= day);
  return now.getFullYear() - year - (hadBirthday ? 0 : 1);
}

export function Age() {
  const { lang } = useParams<{ lang: string }>();
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const age = useSyncExternalStore(
    subscribe,
    () => ageAt(new Date()),
    () => ageAt(new Date(process.env.BUILD_TIME!)),
  );
  const unit = ui[locale].age[new Intl.PluralRules(locale).select(age) as keyof typeof ui.ru.age] ?? ui[locale].age.other;
  return `${age} ${unit}`;
}
