import { site } from "@/config/site";
import type { Text } from "@/content/types";
import type { Locale } from "@/i18n/config";
import styles from "./Footer.module.css";
import { T } from "./T";

export function Footer({ lang, colophon }: { lang: Locale; colophon: Text }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {new Date().getFullYear()} {site.name[lang]}
        </p>
        <p className={styles.colophon}>
          <T v={colophon} />
        </p>
      </div>
    </footer>
  );
}
