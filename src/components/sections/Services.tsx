import type { Content } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/ui";
import { TelegramIcon } from "../Icons";
import { site } from "@/config/site";
import { Section } from "../Section";
import { T } from "../T";
import styles from "./Services.module.css";

type Props = { services: Content["services"]; extra: Content["extraServices"]; projects: Content["projects"]["items"]; ui: Ui; lang: Locale };

export function Services({ services, extra, projects, ui, lang }: Props) {
  const name = (slug: string) => projects.find((project) => project.slug === slug)?.name ?? slug;

  return (
    <Section id="services" title={ui.services.title}>
      <ul>
        {services.map((service, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.row}>
              <h3 className={styles.title}>
                <T v={service.title} />
              </h3>
              <span className={styles.dots} aria-hidden="true" />
              <p className={styles.price}>
                <T v={service.price} />
              </p>
            </div>
            <p className={styles.text}>
              <T v={service.text} />
            </p>
            <p className={styles.meta}>
              <span>
                {ui.services.time}: <T v={service.time} />
              </span>
              {service.cases.length > 0 && (
                <span>
                  {ui.services.case}:{" "}
                  {service.cases.map((item, j) => (
                    <span key={item.slug}>
                      {j > 0 && ", "}
                      <a href={`/${lang}/projects#${item.slug}`}>{name(item.slug)}</a>
                      {item.study && ` (${ui.services.study})`}
                    </span>
                  ))}
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.extra}>
        <h3 className={styles.extraTitle}>
          <T v={extra.title} />
        </h3>
        <ul className={styles.extraList}>
          {extra.items.map((item, i) => (
            <li key={i}>
              <span>
                <T v={item.name} />
              </span>
              <span className={styles.extraPrice}>
                <T v={item.price} />
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.extraNote}>
          <T v={extra.note} />
        </p>
      </div>
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
