import type { Content } from "@/content/types";
import type { Ui } from "@/i18n/ui";
import { HandNote } from "../HandNote";
import { Section } from "../Section";
import { T } from "../T";
import { TechList } from "../Tech";
import styles from "./Roadmap.module.css";

export function Roadmap({ roadmap, ui }: { roadmap: Content["roadmap"]; ui: Ui }) {
  return (
    <Section id="roadmap" title={ui.roadmap.title}>
      <p className={styles.intro}>
        <T v={roadmap.intro} />
      </p>

      <ol className={styles.timeline}>
        {roadmap.timeline.map((milestone) => (
          <li key={milestone.year} className={styles.milestone}>
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

      <div className={styles.skills}>
        <h3 className={styles.skillsTitle}>{ui.roadmap.skills}</h3>
        <div className={styles.group}>
          <h4 className={styles.groupTitle}>{ui.roadmap.strong}</h4>
          <TechList items={roadmap.skills.strong} />
        </div>
        <div className={styles.pair}>
          <div className={styles.group}>
            <h4 className={styles.groupTitle}>{ui.roadmap.learning}</h4>
            <TechList items={roadmap.skills.learning} variant="dashed" />
          </div>
          <div className={styles.group}>
            <h4 className={styles.groupTitle}>{ui.roadmap.side}</h4>
            <TechList items={roadmap.skills.side} variant="dashed" />
          </div>
        </div>
      </div>
    </Section>
  );
}
