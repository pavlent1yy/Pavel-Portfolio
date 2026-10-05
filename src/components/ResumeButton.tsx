"use client";

import { useRef, useState } from "react";
import { cueMascot } from "@/config/mascot";
import { site } from "@/config/site";
import { FileIcon } from "./Icons";
import styles from "./ResumeButton.module.css";

type Props = { label: string; soon: string; compact?: boolean };

export function ResumeButton({ label, soon, compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const className = `btn btn-ghost ${compact ? `btn-small ${styles.compact}` : ""}`;

  if (site.resume) {
    return (
      <a className={className} href={site.resume} target="_blank" rel="noreferrer" data-mascot="joy" aria-label={label}>
        <FileIcon />
        <span className={styles.label}>{label}</span>
      </a>
    );
  }

  const show = () => {
    cueMascot("joy", 2200);
    setOpen(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 2400);
  };

  return (
    <span className={styles.wrap}>
      <button type="button" className={className} onClick={show} data-mascot="joy" aria-label={label}>
        <FileIcon />
        <span className={styles.label}>{label}</span>
      </button>
      <span role="status" className={`${styles.tip} ${open ? styles.open : ""}`}>
        {open ? soon : ""}
      </span>
    </span>
  );
}
