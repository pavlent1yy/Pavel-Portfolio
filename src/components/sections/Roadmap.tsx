import type { Content, Milestone, Project } from "@/content/types";
import type { Ui } from "@/i18n/ui";
import { HandNote } from "../HandNote";
import { Section } from "../Section";
import { T } from "../T";
import styles from "./Roadmap.module.css";
import { RoadmapAutoOpen } from "./RoadmapAutoOpen";

const VISIBLE_UNTIL = 2023;

function Step({ milestone, projects }: { milestone: Milestone; projects: Project[] }) {
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
        {milestone.projectGroup && (
          <div className={styles.projectGroup}>
            <h3 className={styles.itemTitle}><T v={milestone.projectGroup.title} /></h3>
            <div className={styles.groupProjects}>
              <svg className={styles.brace} viewBox="0 0 24 100" preserveAspectRatio="none" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" d="M22 2 C10 2 8 7 8 18 L8 38 C8 45 6 47 4 49 Q2 50 4 51 C6 53 8 55 8 62 L8 82 C8 93 10 98 22 98" />
              </svg>
              {milestone.projectGroup.slugs.map((slug) => {
                const project = projects.find((item) => item.slug === slug);
                return project && (
                  <div key={slug}>
                    <h4 className={styles.itemTitle}>{project.name}</h4>
                    <p className={styles.itemText}><T v={project.summary} /></p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {milestone.note && <HandNote text={milestone.note} arrow="up-left" className={styles.note} />}
      </div>
    </li>
  );
}

export function Roadmap({ roadmap, ui, projects }: { roadmap: Content["roadmap"]; ui: Ui; projects: Project[] }) {
  const early = roadmap.timeline.filter((m) => parseInt(m.year, 10) <= VISIBLE_UNTIL);
  const later = roadmap.timeline.filter((m) => parseInt(m.year, 10) > VISIBLE_UNTIL);

  return (
    <Section id="roadmap" title={ui.roadmap.title}>
      <p className={styles.intro}>
        <T v={roadmap.intro} />
      </p>

      <ol className={styles.timeline}>
        {early.map((milestone) => (
          <Step key={milestone.year} milestone={milestone} projects={projects} />
        ))}
      </ol>

      <RoadmapAutoOpen target="roadmap-more" />
      <details id="roadmap-more" className={styles.more}>
        <summary className={styles.toggle}>
          <span className={styles.showMore}>{ui.roadmap.more}</span>
          <span className={styles.showLess}>{ui.roadmap.less}</span>
        </summary>
        <ol className={styles.timeline}>
          {later.map((milestone) => (
            <Step key={milestone.year} milestone={milestone} projects={projects} />
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
