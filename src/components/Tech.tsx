import type { CSSProperties } from "react";
import {
  siApache,
  siApachekafka,
  siApachemaven,
  siCss,
  siDocker,
  siFlyway,
  siGit,
  siGithubactions,
  siHibernate,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siJunit5,
  siKubernetes,
  siLinux,
  siNextdotjs,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siRedis,
  siSpring,
  siSpringboot,
  siSpringsecurity,
  siSqlite,
  siTailwindcss,
  siTelegram,
  siThymeleaf,
  siTypescript,
} from "simple-icons";
import type { Text } from "@/content/types";
import { BracesIcon } from "./Icons";
import { T } from "./T";
import styles from "./Tech.module.css";

type Icon = { path: string; hex: string };

const icons: Record<string, Icon> = {
  Java: siOpenjdk,
  "Spring Boot": siSpringboot,
  "Spring Security": siSpringsecurity,
  "Spring Data JPA": siSpring,
  Hibernate: siHibernate,
  PostgreSQL: siPostgresql,
  Flyway: siFlyway,
  JWT: siJsonwebtokens,
  Thymeleaf: siThymeleaf,
  "Apache POI": siApache,
  Maven: siApachemaven,
  JUnit: siJunit5,
  Docker: siDocker,
  "Docker Compose": siDocker,
  Git: siGit,
  Linux: siLinux,
  Postman: siPostman,
  Python: siPython,
  aiogram: siTelegram,
  SQLite: siSqlite,
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  JavaScript: siJavascript,
  HTML: siHtml5,
  CSS: siCss,
  Redis: siRedis,
  "Apache Kafka": siApachekafka,
  Kubernetes: siKubernetes,
  "GitHub Actions": siGithubactions,
};

function brandColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.07 && luminance < 0.75 ? `#${hex}` : undefined;
}

function Badge({ item }: { item: Text }) {
  if (typeof item !== "string") {
    return (
      <li className={styles.badge}>
        <T v={item} />
      </li>
    );
  }

  const icon = icons[item];
  const brand = icon ? brandColor(icon.hex) : undefined;

  return (
    <li className={styles.badge} style={brand ? ({ "--brand": brand } as CSSProperties) : undefined}>
      {icon ? (
        <svg className={styles.logo} viewBox="0 0 24 24" aria-hidden="true">
          <path d={icon.path} />
        </svg>
      ) : (
        <BracesIcon className={styles.fallback} />
      )}
      {item}
    </li>
  );
}

type Props = { items: Text[]; variant?: "solid" | "dashed"; size?: "md" | "sm" };

export function TechList({ items, variant = "solid", size = "md" }: Props) {
  return (
    <ul className={`${styles.list} ${styles[variant]} ${styles[size]}`}>
      {items.map((item, i) => (
        <Badge key={typeof item === "string" ? item : i} item={item} />
      ))}
    </ul>
  );
}
