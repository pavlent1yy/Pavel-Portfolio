"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import type { Locale } from "@/i18n/config";
import { GlobeIcon } from "./Icons";
import styles from "./Header.module.css";

type Props = { target: Locale; path: string; full: string; short: string };

export function LangSwitch({ target, path, full, short }: Props) {
  const router = useRouter();
  const href = `/${target}${path}`;

  const go = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.cookie = `lang=${target}; path=/; max-age=31536000; SameSite=Lax`;
    router.push(`${href}${window.location.hash}`);
  };

  return (
    <a href={href} hrefLang={target} lang={target} className={styles.lang} onClick={go}>
      <GlobeIcon className={styles.langIcon} />
      <span className={styles.langFull}>{full}</span>
      <span className={styles.langShort}>{short}</span>
    </a>
  );
}
