"use client";

import { cueMascot } from "@/config/mascot";
import { BulbOffIcon, BulbOnIcon, MoonIcon, SunIcon } from "./Icons";
import styles from "./Header.module.css";

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) apply();
    else document.startViewTransition(apply).ready.catch(() => {});
    cueMascot(next === "dark" ? "rubEyes" : "squint");
  };

  return (
    <button type="button" className={styles.theme} onClick={toggle} aria-label={label} title={label}>
      <SunIcon className={`${styles.themeIcon} ${styles.sun}`} />
      <MoonIcon className={`${styles.themeIcon} ${styles.moon}`} />
      <BulbOnIcon className={`${styles.themeIcon} ${styles.bulbOn}`} />
      <BulbOffIcon className={`${styles.themeIcon} ${styles.bulbOff}`} />
    </button>
  );
}
