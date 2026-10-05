import type { Text } from "@/content/types";
import styles from "./HandNote.module.css";
import { T } from "./T";

type Props = {
  text: Text;
  arrow?: "up-left" | "left" | "down-left" | "down-right";
  animated?: boolean;
  className?: string;
};

export function HandNote({ text, arrow = "up-left", animated = false, className = "" }: Props) {
  return (
    <p
      className={`${styles.note} ${styles[arrow] ?? ""} ${animated ? styles.animated : ""} ${className}`}
    >
      <svg className={styles.arrow} viewBox="0 0 80 48" aria-hidden="true">
        <path pathLength={1} d="M74 40C56 44 30 38 12 12" />
        <path pathLength={1} d="M12 12c0 6 .5 11 2 15M12 12c5 1.5 9.5 3 13.5 5.5" />
      </svg>
      <span className={styles.text}>
        <T v={text} />
      </span>
    </p>
  );
}
