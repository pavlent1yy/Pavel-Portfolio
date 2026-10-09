import type { Content } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/ui";
import { TelegramIcon } from "../Icons";
import { site } from "@/config/site";
import { Section } from "../Section";
import { T } from "../T";
import styles from "./Services.module.css";

type Props = { services: Content["services"]; projects: Content["projects"]["items"]; ui: Ui; lang: Locale };

export function Services({ services, projects, ui, lang }: Props) {
  const name = (slug: string) => projects.find((project) => project.slug === slug)?.name ?? slug;

  return (
    <Section id="services" title={ui.services.title}>
      <ul className={styles.list}>
        {services.map((service, i) => (
          <li key={i} className={styles.item}>
            <h3 className={styles.title}>
              <T v={service.title} />
            </h3>
            <p className={styles.text}>
              <T v={service.text} />
            </p>
            <p className={styles.includes}>
              <span className={styles.label}>{ui.services.includes}: </span>
              {service.includes.map((item, j) => (
                <span key={j}>
                  {j > 0 && ", "}
                  <T v={item} />
                </span>
              ))}
            </p>
            <dl className={styles.facts}>
              <div>
                <dt>{ui.services.price}</dt>
                <dd>
                  <T v={service.price} />
                </dd>
              </div>
              <div>
                <dt>{ui.services.time}</dt>
                <dd>
                  <T v={service.time} />
                </dd>
              </div>
              <div>
                <dt>{ui.services.case}</dt>
                <dd>
                  {service.cases.map((item, j) => (
                    <span key={item.slug}>
                      {j > 0 && ", "}
                      <a href={`/${lang}/projects#${item.slug}`}>{name(item.slug)}</a>
                      {item.study && <span className={styles.study}> ({ui.services.study})</span>}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <div className={styles.other}>
        <p>{ui.services.other}</p>
        <a className="btn btn-ghost btn-small" href={site.contacts.telegram.url} target="_blank" rel="noreferrer">
          <TelegramIcon />
          {ui.hero.write}
        </a>
      </div>
    </Section>
  );
}
