import { site } from "@/config/site";
import type { Content } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/ui";
import { TelegramIcon } from "../Icons";
import { Landscape } from "../Landscape";
import { LocalTime } from "../LocalTime";
import { T } from "../T";
import styles from "./Hero.module.css";

type Props = { hero: Content["hero"]; ui: Ui; lang: Locale };

export function Hero({ hero, ui, lang }: Props) {
  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <div className={styles.meta}>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            <T v={hero.status} />
          </p>
          <p>
            <T v={hero.city} />, <LocalTime timeZone={site.timeZone} locale={lang} />
          </p>
        </div>

        <h1 className={styles.headline}>
          <T v={hero.headline} />
        </h1>

        <p className={styles.lead}>
          <T v={hero.lead} />
        </p>

        <div className={styles.actions}>
          <a className="btn btn-primary" href={site.contacts.telegram.url} target="_blank" rel="noreferrer">
            <TelegramIcon />
            {ui.hero.write}
          </a>
          <a className="btn btn-ghost" href="#projects">
            {ui.hero.projects}
          </a>
        </div>
      </div>

      <Landscape note={hero.note} />
    </section>
  );
}
