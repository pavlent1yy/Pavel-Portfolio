import Image from "next/image";
import type { Content } from "@/content/types";
import type { Ui } from "@/i18n/ui";
import { Section } from "../Section";
import { T } from "../T";
import styles from "./About.module.css";

export function About({ about, ui }: { about: Content["about"]; ui: Ui }) {
  const photo = (
    <figure className={styles.photo}>
      {about.photo ? (
        <Image src={about.photo} alt="" fill sizes="260px" />
      ) : (
        <figcaption className="todo">{ui.photo}</figcaption>
      )}
    </figure>
  );

  return (
    <Section id="about" title={ui.nav.about} aside={photo} divider={false}>
      <div className={styles.text}>
        {about.text.map((paragraph, i) => (
          <p key={i}>
            <T v={paragraph} />
          </p>
        ))}
      </div>

      <dl className={styles.principles}>
        {about.principles.map((principle, i) => (
          <div key={i} className={styles.principle}>
            <dt>
              {typeof principle.title === "string" ? <q>{principle.title}</q> : <T v={principle.title} />}
            </dt>
            <dd>
              <T v={principle.text} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
