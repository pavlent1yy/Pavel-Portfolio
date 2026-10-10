import { site } from "@/config/site";
import type { Content } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/ui";
import { GithubIcon, LinkedinIcon, TelegramIcon, VkIcon } from "../Icons";
import { Landscape } from "../Landscape";
import { LocalTime } from "../LocalTime";
import { T } from "../T";
import styles from "./Hero.module.css";

const networks = {
  telegram: { name: "Telegram", Icon: TelegramIcon },
  vk: { name: "VK", Icon: VkIcon },
  github: { name: "GitHub", Icon: GithubIcon },
  linkedin: { name: "LinkedIn", Icon: LinkedinIcon },
};

function Highlighted({ text, words }: { text: string; words: string[] }) {
  const escaped = words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length === 0) return text;
  return text.split(new RegExp(`(${escaped.join("|")})`)).map((part, i) =>
    words.includes(part) ? (
      <span key={i} className={styles.mark}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

type Props = { hero: Content["hero"]; ui: Ui; lang: Locale };

export function Hero({ hero, ui, lang }: Props) {
  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <div className={styles.meta}>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            <T v={hero.status} />
            {site.presence
              .filter((id) => site.contacts[id].url)
              .map((id) => {
                const { name, Icon } = networks[id];
                return (
                  <a
                    key={id}
                    className={styles.network}
                    href={site.contacts[id].url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    title={name}
                  >
                    <Icon />
                  </a>
                );
              })}
          </p>
          <p>
            <T v={hero.city} />, <LocalTime timeZone={site.timeZone} locale={lang} />
          </p>
        </div>

        <h1 className={styles.headline}>
          <T v={hero.headline} />
          <span className={styles.role}>
            <T v={hero.role} />
          </span>
        </h1>

        <p className={styles.lead}>
          {typeof hero.lead === "string" ? <Highlighted text={hero.lead} words={hero.highlights} /> : <T v={hero.lead} />}
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
