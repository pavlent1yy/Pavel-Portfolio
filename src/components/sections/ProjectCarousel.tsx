"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import styles from "./Projects.module.css";

export type Slide = { slug: string; head: ReactNode; body: ReactNode };

const motionQuery = "(prefers-reduced-motion: reduce)";

const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export function ProjectCarousel({ slides, interval = 5000 }: { slides: Slide[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [manual, setManual] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  const autoplay = !manual && !reduced;
  const running = autoplay && visible && !hovered && !focused;

  return (
    <ol
      ref={listRef}
      className={styles.carousel}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      {slides.map((slide, i) => {
        const open = i === active;
        return (
          <li key={slide.slug} className={`${styles.slide} ${open ? styles.open : ""}`}>
            <button
              type="button"
              className={styles.slideHead}
              aria-expanded={open}
              aria-controls={`slide-${slide.slug}`}
              onClick={() => {
                setActive(i);
                setManual(true);
              }}
            >
              {slide.head}
            </button>
            {open && autoplay && (
              <span
                key={active}
                className={styles.progress}
                style={{ animationDuration: `${interval}ms`, animationPlayState: running ? "running" : "paused" }}
                onAnimationEnd={() => setActive((active + 1) % slides.length)}
                aria-hidden="true"
              />
            )}
            <div id={`slide-${slide.slug}`} className={styles.slideBody} inert={!open}>
              <div className={styles.slideInner}>{slide.body}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
