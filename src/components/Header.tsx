import { site } from "@/config/site";
import { otherLocale, type Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/ui";
import styles from "./Header.module.css";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { LangSwitch } from "./LangSwitch";
import { ResumeButton } from "./ResumeButton";
import { ThemeToggle } from "./ThemeToggle";

const sections = ["about", "projects", "roadmap", "faq"] as const;

type Props = { lang: Locale; ui: Ui; path?: string };

export function Header({ lang, ui, path = "" }: Props) {
  const links = [
    ...sections.map((id) => ({ href: `/${lang}#${id}`, label: ui.nav[id] })),
    { href: `/${lang}#contact`, label: ui.nav.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href={`/${lang}`} className={styles.name} aria-label={site.name[lang]}>
          <Logo variant={site.logo[lang]} lang={lang} />
        </a>
        <nav className={styles.nav} aria-label={ui.navLabel}>
          {sections.map((id) => (
            <a key={id} href={`/${lang}#${id}`}>
              {ui.nav[id]}
            </a>
          ))}
          <a href={`/${lang}#contact`} className={styles.navContact}>
            {ui.nav.contact}
          </a>
        </nav>
        <div className={styles.tools}>
          <ResumeButton label={ui.resume.label} soon={ui.resume.soon} compact />
          <LangSwitch target={otherLocale(lang)} path={path} {...ui.langSwitch} />
          <ThemeToggle label={ui.theme} />
          <MobileNav items={links} label={ui.menu} />
        </div>
      </div>
    </header>
  );
}
