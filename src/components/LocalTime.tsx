"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
};

export function LocalTime({ timeZone, locale }: { timeZone: string; locale: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone }).format(
        new Date(),
      ),
    () => null,
  );

  return <time suppressHydrationWarning>{time ?? "--:--"}</time>;
}
