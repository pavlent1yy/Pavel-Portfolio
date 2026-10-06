"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

type Props = { items: { href: string; label: string }[]; label: string };

export function MobileNav({ items, label }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className={styles.menu}>
      <button
        type="button"
        className={`${styles.theme} ${styles.menuButton} ${open ? styles.menuOpen : ""}`}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={label}
        title={label}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.burger} aria-hidden="true" />
      </button>
      <nav id="mobile-nav" className={`${styles.menuPanel} ${open ? styles.menuPanelOpen : ""}`} aria-label={label} inert={!open}>
        {items.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
