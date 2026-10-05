"use client";

import { createContext, use, useRef, useState, type ReactNode } from "react";
import { raw, type Text } from "@/content/types";
import styles from "./Mode.module.css";

type Mode = "human" | "tech";
type Anim = { start: number; now: number } | null;

const MAX_DURATION = 1400;

const ModeContext = createContext<{ mode: Mode; anim: Anim; setMode: (mode: Mode) => void }>({
  mode: "human",
  anim: null,
  setMode: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("human");
  const [anim, setAnim] = useState<Anim>(null);
  const run = useRef(0);

  const setMode = (next: Mode) => {
    if (next === mode) return;
    setModeState(next);
    const id = ++run.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnim(null);
      return;
    }
    const start = performance.now();
    setAnim({ start, now: start });
    const tick = (now: number) => {
      if (run.current !== id) return;
      if (now - start > MAX_DURATION) {
        setAnim(null);
        return;
      }
      setAnim({ start, now });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return <ModeContext value={{ mode, anim, setMode }}>{children}</ModeContext>;
}

type SwitchProps = { label: string; human: string; tech: string };

export function ModeSwitch({ label, human, tech }: SwitchProps) {
  const { mode, setMode } = use(ModeContext);

  return (
    <div className={styles.switch} role="group" aria-label={label}>
      <span className={styles.thumb} data-mode={mode} aria-hidden="true" />
      <button type="button" aria-pressed={mode === "human"} onClick={() => setMode("human")}>
        {human}
      </button>
      <button type="button" aria-pressed={mode === "tech"} onClick={() => setMode("tech")}>
        {tech}
      </button>
    </div>
  );
}

export function Typed({ human, tech }: { human: Text[]; tech: Text[] }) {
  const { mode, anim } = use(ModeContext);
  const items = mode === "tech" ? tech : human;
  const lengths = items.map((item) => raw(item).length);
  const starts = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0));
  const total = lengths.reduce((a, b) => a + b, 0);
  const duration = Math.min(MAX_DURATION - 100, Math.max(450, total * 6));
  const elapsed = anim ? anim.now - anim.start : Infinity;
  const typing = elapsed < duration;
  const budget = typing ? Math.floor((total * elapsed) / duration / 3) * 3 : total;

  return (
    <div className={`${styles.typed} ${mode === "tech" ? styles.tech : ""}`}>
      {items.map((item, i) => {
        const full = raw(item);
        const start = starts[i];
        const shown = full.slice(0, Math.max(0, budget - start));
        const caret = typing && budget >= start && budget < start + lengths[i];
        const wrap = (text: string) =>
          typeof item === "string" ? text : <span className="todo">{text}</span>;

        return (
          <p key={`${mode}-${i}`} className={styles.paragraph}>
            <span className={styles.ghost} aria-hidden="true">
              {wrap(full)}
            </span>
            <span className={styles.live}>
              {shown && wrap(shown)}
              {caret && <span className={styles.caret} aria-hidden="true" />}
            </span>
          </p>
        );
      })}
    </div>
  );
}
