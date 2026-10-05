import type { ReactNode } from "react";
import type { Pose } from "@/config/mascot";
import styles from "./Section.module.css";

type Props = {
  id: string;
  title: string;
  layout?: "split" | "stack";
  divider?: boolean;
  zone?: Pose;
  aside?: ReactNode;
  children: ReactNode;
};

export function Section({ id, title, layout = "split", divider = true, zone, aside, children }: Props) {
  return (
    <section
      id={id}
      className={`${styles.section} ${divider ? styles.divider : ""}`}
      aria-labelledby={`${id}-title`}
      data-mascot-zone={zone}
    >
      <div className={`container ${styles[layout]}`}>
        <div className={styles.head}>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          {aside}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
