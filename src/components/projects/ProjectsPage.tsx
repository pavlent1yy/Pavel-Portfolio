import { site } from "@/config/site";
import Image from "next/image";
import type { Content, Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/ui";
import { HandNote } from "../HandNote";
import { ChevronLeftIcon, ExternalIcon } from "../Icons";
import { T } from "../T";
import { TechList } from "../Tech";
import { HumanOnly, ModeSwitch, Typed } from "./Mode";
import styles from "./ProjectsPage.module.css";

function Article({ project, ui }: { project: Project; ui: Ui }) {
  return (
    <article id={project.slug} className={`${styles.article} ${project.side ? styles.compact : ""}`}>
      <header className={styles.head}>
        <div>
          <h2 className={styles.name}>{project.name}</h2>
          <p className={styles.kind}>
            <T v={project.kind} />
          </p>
        </div>
        <div className={styles.meta}>
          <span className={styles.year}>{project.year}</span>
          {project.live && (
            <a className="btn btn-ghost btn-small" href={project.live} target="_blank" rel="noreferrer">
              {ui.projects.live}
              <ExternalIcon />
            </a>
          )}
          {project.repo && (
            <a className="btn btn-ghost btn-small" href={project.repo} target="_blank" rel="noreferrer">
              {ui.projects.code}
              <ExternalIcon />
            </a>
          )}
        </div>
      </header>

      <div className={styles.body}>
        <div>
          <Typed human={project.human} tech={project.tech} />
          {project.steps && (
            <HumanOnly>
              <div className={styles.steps}>
                <h3 className={styles.stepsTitle}>{ui.projects.steps}</h3>
                <ol className={styles.stepList}>
                  {(["task", "solution", "result"] as const).map((key) => (
                    <li key={key} className={styles.step}>
                      <span className={styles.stepLabel}>{ui.projects[key]}</span>
                      <T v={project.steps![key]} />
                    </li>
                  ))}
                </ol>
              </div>
            </HumanOnly>
          )}
          {project.credit && (
            <p className={styles.credit}>
              <T v={project.credit.text} />{" "}
              <a href={project.credit.url} target="_blank" rel="noreferrer">
                {project.credit.handle}
              </a>
            </p>
          )}
        </div>
        <aside className={styles.stack}>
          <h3 className={styles.stackTitle}>{ui.projects.stack}</h3>
          <TechList items={project.stack} size="sm" />
        </aside>
      </div>

      {project.shots.length > 0 && (
        <div className={styles.gallery}>
          {project.shots.map((shot, i) => (
            <figure key={i} className={styles.shot}>
              {shot.src && shot.width && shot.height ? (
                <a href={shot.src} target="_blank" rel="noreferrer" className={styles.imageLink}>
                  <Image
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt=""
                    sizes="(max-width: 860px) 100vw, 560px"
                    loading="lazy"
                  />
                </a>
              ) : (
                <div className={styles.placeholder}>
                  <span className="todo">{ui.projects.shot}</span>
                </div>
              )}
              <figcaption className={styles.caption}>
                <T v={shot.caption} />
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}

export function ProjectsPage({ projects, ui, lang }: { projects: Content["projects"]; ui: Ui; lang: Locale }) {
  const main = projects.items.filter((project) => !project.side);
  const side = projects.items.filter((project) => project.side);

  return (
    <>
      <div className={`container ${styles.intro}`}>
        <a className={styles.back} href={`/${lang}#projects`}>
          <ChevronLeftIcon />
          {ui.projects.home}
        </a>
        <h1 className={styles.title}>{ui.projects.title}</h1>
        <div className={styles.lead}>
          <p>
            <T v={projects.page.intro} />
          </p>
          <HandNote text={projects.page.note} arrow="down-left" />
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={`container ${styles.toolbarInner}`}>
          <ModeSwitch label={ui.projects.mode} human={ui.projects.human} tech={ui.projects.tech} />
          <nav className={styles.index} aria-label={ui.projects.index}>
            {[...main, ...side].map((project) => (
              <a key={project.slug} href={`#${project.slug}`}>
                {project.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container">
        {main.map((project) => (
          <Article key={project.slug} project={project} ui={ui} />
        ))}
        <h2 id="side" className={styles.sideTitle}>
          {ui.projects.side}
        </h2>
        {side.map((project) => (
          <Article key={project.slug} project={project} ui={ui} />
        ))}
        <p className={styles.outro}>
          <T v={projects.page.outro} />{" "}
          <a href={site.contacts.github.url} target="_blank" rel="noreferrer">
            github.com/{site.contacts.github.handle}
          </a>
        </p>
      </div>
    </>
  );
}
