import type { CSSProperties } from "react";
import {
  siAndroidstudio,
  siApache,
  siApachekafka,
  siApachemaven,
  siArduino,
  siC,
  siClaude,
  siCplusplus,
  siCss,
  siDocker,
  siDotnet,
  siFigma,
  siFlyway,
  siGit,
  siGithubactions,
  siHibernate,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siJunit5,
  siKotlin,
  siKubernetes,
  siLinux,
  siNextdotjs,
  siOpenapiinitiative,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siRaspberrypi,
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
  siWordpress,
} from "simple-icons";
import type { Text } from "@/content/types";
import { BracesIcon, GlobeIcon, SparkIcon } from "./Icons";
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
  "REST API": siOpenapiinitiative,
  JavaFX: siOpenjdk,
  Arduino: siArduino,
  "Raspberry Pi": siRaspberrypi,
  "Claude Code": siClaude,
  Kotlin: siKotlin,
  C: siC,
  "C++": siCplusplus,
  "C#": siDotnet,
  ".Net": siDotnet,
  "Android-studio": siAndroidstudio,
  PHP: siPhp,
  WordPress: siWordpress,
  Figma: siFigma,
};

const keywords = Object.keys(icons).sort((a, b) => b.length - a.length);

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function findIcon(item: string): Icon | undefined {
  if (icons[item]) return icons[item];
  const key = keywords.find((k) => new RegExp(`(^|[^\\p{L}\\d+#.])${escape(k)}($|[^\\p{L}\\d+#])`, "iu").test(item));
  return key ? icons[key] : undefined;
}

const generic: [RegExp, typeof BracesIcon][] = [
  [/AI|LLM|нейросет/i, SparkIcon],
  [/домен|domain|jsoup/i, GlobeIcon],
  [/front-?end|фронт/i, BracesIcon],
];

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

  const icon = findIcon(item);
  const Fallback = generic.find(([test]) => test.test(item))?.[1] ?? BracesIcon;
  const brand = icon ? brandColor(icon.hex) : undefined;

  return (
    <li className={styles.badge} style={brand ? ({ "--brand": brand } as CSSProperties) : undefined}>
      {icon ? (
        <svg className={styles.logo} viewBox="0 0 24 24" aria-hidden="true">
          <path d={icon.path} />
        </svg>
      ) : (
        <Fallback className={styles.fallback} />
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
