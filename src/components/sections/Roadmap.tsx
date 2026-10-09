import type { Content, Milestone } from "@/content/types";
import type { Ui } from "@/i18n/ui";
import { HandNote } from "../HandNote";
import { Section } from "../Section";
import { T } from "../T";
import styles from "./Roadmap.module.css";

const VISIBLE_UNTIL = 2023;

function Step({ milestone }: { milestone: Milestone }) {
  return (
    <li className={styles.milestone}>
      <span className={styles.year}>{milestone.year}</span>
      <div className={styles.items}>
        {milestone.items.map((item, i) => (
          <div key={i}>
            <h3 className={styles.itemTitle}>
              <T v={item.title} />
            </h3>
            <p className={styles.itemText}>
              <T v={item.text} />
            </p>
          </div>
        ))}
        {milestone.note && <HandNote text={milestone.note} arrow="up-left" className={styles.note} />}
      </div>
    </li>
  );
}

export function Roadmap({ roadmap, ui }: { roadmap: Content["roadmap"]; ui: Ui }) {
  const early = roadmap.timeline.filter((m) => parseInt(m.year, 10) <= VISIBLE_UNTIL);
  const later = roadmap.timeline.filter((m) => parseInt(m.year, 10) > VISIBLE_UNTIL);

  return (
    <Section id="roadmap" title={ui.roadmap.title}>
      <p className={styles.intro}>
        <T v={roadmap.intro} />
      </p>

      <ol className={styles.timeline}>
        {early.map((milestone) => (
          <Step key={milestone.year} milestone={milestone} />
        ))}
      </ol>

      <details className={styles.more}>
        <summary className={styles.toggle}>
          <span className={styles.showMore}>{ui.roadmap.more}</span>
          <span className={styles.showLess}>{ui.roadmap.less}</span>
        </summary>
        <ol className={styles.timeline}>
          {later.map((milestone) => (
            <Step key={milestone.year} milestone={milestone} />
          ))}
          <li className={`${styles.milestone} ${styles.next}`}>
            <span className={styles.year}>{ui.roadmap.next}</span>
            <ul className={styles.items}>
              {roadmap.next.map((item, i) => (
                <li key={i} className={styles.itemText}>
                  <T v={item} />
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </details>
    </Section>
  );
}
