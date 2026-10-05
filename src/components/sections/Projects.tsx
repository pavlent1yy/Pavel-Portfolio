import Image from "next/image";
import type { Content, Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/ui";
import { HandNote } from "../HandNote";
import { ExternalIcon } from "../Icons";
import { Section } from "../Section";
import { T } from "../T";
import { TechList } from "../Tech";
import styles from "./Projects.module.css";

type Props = { projects: Content["projects"]; ui: Ui; lang: Locale };

function Links({ project, ui, lang }: { project: Project; ui: Ui; lang: Locale }) {
  return (
    <div className={styles.links}>
      <a className="btn btn-ghost btn-small" href={`/${lang}/projects#${project.slug}`}>
        {ui.projects.more}
      </a>
      {project.live && (
        <a className={styles.link} href={project.live} target="_blank" rel="noreferrer">
          {ui.projects.live}
          <ExternalIcon />
        </a>
      )}
      {project.repo && (
        <a className={styles.link} href={project.repo} target="_blank" rel="noreferrer">
          {ui.projects.code}
          <ExternalIcon />
        </a>
      )}
    </div>
  );
}

export function Projects({ projects, ui, lang }: Props) {
  const featured = projects.items.find((p) => p.slug === projects.featured) ?? projects.items[0];
  const rest = projects.items.filter((p) => p !== featured);
  const cover = featured.shots.find((shot) => shot.src);

  return (
    <Section id="projects" title={ui.nav.projects} layout="stack" zone="laptop">
      <p className={styles.intro}>
        <T v={projects.intro} />
      </p>

      <article className={styles.featured}>
        <div className={styles.featuredText}>
          <div className={styles.featuredHead}>
            <h3 className={styles.featuredName}>{featured.name}</h3>
            <span className={styles.year}>{featured.year}</span>
          </div>
          <p className={styles.kind}>
            <T v={featured.kind} />
          </p>
          <p className={styles.summary}>
            <T v={featured.summary} />
          </p>
          <TechList items={featured.stack} size="sm" />
          <Links project={featured} ui={ui} lang={lang} />
        </div>
        <figure className={styles.shot}>
          {cover?.src ? (
            <Image src={cover.src} alt={featured.name} fill sizes="(max-width: 860px) 100vw, 640px" unoptimized />
          ) : (
            <figcaption className="todo">{ui.projects.shot}</figcaption>
          )}
        </figure>
      </article>

      <ul className={styles.list}>
        {rest.map((project) => (
          <li key={project.slug} className={styles.row}>
            <span className={styles.year}>{project.year}</span>
            <div className={styles.rowMain}>
              <h3 className={styles.rowName}>{project.name}</h3>
              <p className={styles.rowSummary}>
                <T v={project.summary} />
              </p>
              <TechList items={project.stack} size="sm" />
            </div>
            <Links project={project} ui={ui} lang={lang} />
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <a className="btn btn-primary" href={`/${lang}/projects`}>
          {ui.projects.all}
        </a>
        <HandNote text={projects.note} arrow="left" />
      </div>
    </Section>
  );
}
