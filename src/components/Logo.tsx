import type { Locale } from "@/i18n/config";
import styles from "./Logo.module.css";

export const logoVariants = ["braces", "spin", "xyxar", "hand"] as const;

export type LogoVariant = (typeof logoVariants)[number];

const surname: Record<Locale, { first: string; mid: string; second: string; rest: string }> = {
  ru: { first: "Х", mid: "у", second: "х", rest: "арев" },
  en: { first: "Kh", mid: "u", second: "h", rest: "arev" },
};

export function Logo({ variant, lang }: { variant: LogoVariant; lang: Locale }) {
  const { first, mid, second, rest } = surname[lang];

  if (variant === "xyxar") {
    return (
      <span className={`${styles.logo} ${styles.xyxar}`}>
        <span className={styles.x}>X</span>y<span className={styles.x}>X</span>ar
        <span className={styles.cursor} aria-hidden="true" />
      </span>
    );
  }

  if (variant === "braces") {
    return (
      <span className={`${styles.logo} ${styles.braces}`}>
        {first}
        {mid}
        <span className={styles.brace}>{"{"}</span>
        <span className={styles.x}>{second}</span>
        <span className={styles.brace}>{"}"}</span>
        {rest}
      </span>
    );
  }

  return (
    <span className={`${styles.logo} ${styles[variant]}`}>
      <span className={styles.x}>{first}</span>
      {mid}
      <span className={styles.x}>{second}</span>
      {rest}
    </span>
  );
}
