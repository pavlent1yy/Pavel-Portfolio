import type { Content, Question } from "@/content/types";
import type { Ui } from "@/i18n/ui";
import { Section } from "../Section";
import { T } from "../T";
import styles from "./Faq.module.css";

function Group({ title, items, minor = false }: { title: string; items: Question[]; minor?: boolean }) {
  return (
    <div className={`${styles.group} ${minor ? styles.minor : ""}`}>
      <h3 className={styles.groupTitle}>{title}</h3>
      {items.map((item, i) => (
        <details key={i} className={styles.item}>
          <summary className={styles.q}>
            <T v={item.q} />
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <p className={styles.a}>
            <T v={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}

export function Faq({ faq, ui }: { faq: Content["faq"]; ui: Ui }) {
  return (
    <Section id="faq" title={ui.nav.faq} zone="book">
      <Group title={ui.faq.clients} items={faq.clients} />
      <Group title={ui.faq.employers} items={faq.employers} minor />
    </Section>
  );
}
