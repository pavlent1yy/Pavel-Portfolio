import type { Content } from "@/content/types";
import type { Ui } from "@/i18n/ui";
import { Section } from "../Section";
import { T } from "../T";
import { TechList } from "../Tech";
import styles from "./Roadmap.module.css";

export function Skills({ skills, ui }: { skills: Content["roadmap"]["skills"]; ui: Ui }) {
  return (
    <Section id="skills" title={ui.roadmap.skills}>
      <div className={styles.skills}>
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>{ui.roadmap.strong}</h3>
          <div className={styles.subgroups}>
            {skills.strong.map((group, i) => (
              <div key={i}>
                <h4 className={styles.subTitle}>
                  <T v={group.title} />
                </h4>
                <TechList items={group.items} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pair}>
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>{ui.roadmap.learning}</h3>
            <TechList items={skills.learning} variant="dashed" />
          </div>
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>{ui.roadmap.side}</h3>
            <TechList items={skills.side} variant="dashed" />
          </div>
        </div>
      </div>
    </Section>
  );
}
