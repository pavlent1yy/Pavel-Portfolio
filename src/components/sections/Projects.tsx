import Image from "next/image";
import type { Content, Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/ui";
import { HandNote } from "../HandNote";
import { ExternalIcon } from "../Icons";
import { Section } from "../Section";
import { T } from "../T";
import { TechList } from "../Tech";
import { ProjectCarousel, type Slide } from "./ProjectCarousel";
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
  const slides: Slide[] = projects.items.filter((project) => !project.side).map((project) => {
    const cover = project.shots.find((shot) => shot.src);
    return {
      slug: project.slug,
      head: (
        <>
          <span className={styles.year}>{project.year}</span>
          <span className={styles.slideName}>{project.name}</span>
          <span className={styles.kind}>
            <T v={project.kind} />
          </span>
        </>
      ),
      body: (
        <div className={`${styles.featured} ${cover?.src ? "" : styles.noShot}`}>
          <div className={styles.featuredText}>
            <p className={styles.summary}>
              <T v={project.summary} />
            </p>
            <TechList items={project.stack} size="sm" />
            <Links project={project} ui={ui} lang={lang} />
          </div>
          {cover?.src && (
            <figure className={styles.shot}>
              <Image src={cover.src} alt={project.name} fill sizes="(max-width: 860px) 100vw, 640px" />
            </figure>
          )}
        </div>
      ),
    };
  });

  return (
    <Section id="projects" title={ui.nav.projects} layout="stack" zone="laptop">
      <p className={styles.intro}>
        <T v={projects.intro} />
      </p>

      <ProjectCarousel slides={slides} />

      <div className={styles.footer}>
        <a className="btn btn-primary" href={`/${lang}/projects`}>
          {ui.projects.all}
        </a>
        <a className={styles.link} href={`/${lang}/projects#side`}>
          {ui.projects.sideLink}
        </a>
        <HandNote text={projects.note} arrow="left" />
      </div>
    </Section>
  );
}
