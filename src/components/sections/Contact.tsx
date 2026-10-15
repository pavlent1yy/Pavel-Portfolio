import { site } from "@/config/site";
import type { Content } from "@/content/types";
import type { Ui } from "@/i18n/ui";
import { HandNote } from "../HandNote";
import { FlIcon, FreelanceIcon, GithubIcon, KworkIcon, MailIcon, TelegramIcon } from "../Icons";
import { ResumeButton } from "../ResumeButton";
import { Section } from "../Section";
import { T } from "../T";
import styles from "./Contact.module.css";

const marketplaceIcons = { kwork: KworkIcon, fl: FlIcon, freelance: FreelanceIcon };

export function Contact({ contact, ui }: { contact: Content["contact"]; ui: Ui }) {
  const { telegram, email, github } = site.contacts;

  return (
    <Section id="contact" title={ui.nav.contact} layout="stack" zone="sign">
      <p className={styles.headline}>
        <T v={contact.headline} />
      </p>
      <p className={styles.text}>
        <T v={contact.text} />
      </p>

      <div className={styles.row}>
        <ul className={styles.links}>
          <li>
            <a className="btn btn-primary" href={telegram.url} target="_blank" rel="noreferrer">
              <TelegramIcon />
              {telegram.handle}
            </a>
          </li>
          <li>
            <a className="btn btn-ghost" href={`mailto:${email}`}>
              <MailIcon />
              {email}
            </a>
          </li>
          <li>
            <a className="btn btn-ghost" href={github.url} target="_blank" rel="noreferrer">
              <GithubIcon />
              {github.handle}
            </a>
          </li>
          {site.resume && (
            <li>
              <ResumeButton label={ui.resume.label} soon={ui.resume.soon} />
            </li>
          )}
        </ul>
        {site.resume && <HandNote text={contact.note} arrow="left" className={styles.note} />}
      </div>

      <fieldset className={styles.marketplaces}>
        <legend className={styles.caption}>{ui.marketplaces}</legend>
        <ul className={styles.links}>
          {site.marketplaces.map((id) => {
            const { name, url } = site.contacts[id];
            const Icon = marketplaceIcons[id];
            return (
              <li key={id}>
                <a className="btn btn-ghost btn-small" href={url} target="_blank" rel="noreferrer">
                  <Icon />
                  {name}
                </a>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </Section>
  );
}
