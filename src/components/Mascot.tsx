"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { preload } from "react-dom";
import { mascotPhotos, type Pose } from "@/config/mascot";
import type { Text } from "@/content/types";
import styles from "./Mascot.module.css";
import { MascotFace } from "./MascotFace";
import { T } from "./T";

type CueDetail = { pose: Pose; ms?: number };

const desktopQuery = "(min-width: 1081px) and (hover: hover)";

const subscribeDesktop = (onChange: () => void) => {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export function Mascot(props: { sign: Text; hideLabel: string }) {
  const desktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
  return desktop ? <DesktopMascot {...props} /> : null;
}

function DesktopMascot({ sign, hideLabel }: { sign: Text; hideLabel: string }) {
  const [zone, setZone] = useState<Pose>("idle");
  const [cue, setCue] = useState<Pose | null>(null);
  const [hover, setHover] = useState<Pose | null>(null);
  const [script, setScript] = useState<Pose | null>(null);
  const [phase, setPhase] = useState<"shown" | "leaving" | "gone">("shown");
  const cueTimer = useRef<number | undefined>(undefined);
  const hoverTimer = useRef<number | undefined>(undefined);

  for (const src of Object.values(mascotPhotos)) preload(src, { as: "image" });

  useEffect(() => {
    const zones = new Map<Element, Pose>();
    const active: Element[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = active.indexOf(entry.target);
          if (entry.isIntersecting && i === -1) active.push(entry.target);
          if (!entry.isIntersecting && i !== -1) active.splice(i, 1);
        }
        const current = active.at(-1);
        setZone(current ? (zones.get(current) ?? "idle") : "idle");
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-mascot-zone]").forEach((el) => {
      zones.set(el, el.dataset.mascotZone as Pose);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const show = (pose: Pose, ms?: number) => {
      window.clearTimeout(cueTimer.current);
      setCue(pose);
      if (ms) cueTimer.current = window.setTimeout(() => setCue(null), ms);
    };
    const release = () => {
      window.clearTimeout(cueTimer.current);
      cueTimer.current = window.setTimeout(() => setCue(null), 700);
    };
    const owner = (node: EventTarget | null) =>
      node instanceof Element ? node.closest<HTMLElement>("[data-mascot]") : null;

    const onCue = (event: Event) => {
      const { pose, ms } = (event as CustomEvent<CueDetail>).detail;
      show(pose, ms);
    };
    const onEnter = (event: Event) => {
      const el = owner(event.target);
      if (el) show(el.dataset.mascot as Pose);
    };
    const onLeave = (event: Event) => {
      const el = owner(event.target);
      const next = (event as PointerEvent | FocusEvent).relatedTarget;
      if (el && !(next instanceof Node && el.contains(next))) release();
    };

    window.addEventListener("mascot", onCue);
    document.addEventListener("pointerover", onEnter);
    document.addEventListener("pointerout", onLeave);
    document.addEventListener("focusin", onEnter);
    document.addEventListener("focusout", onLeave);
    return () => {
      window.removeEventListener("mascot", onCue);
      document.removeEventListener("pointerover", onEnter);
      document.removeEventListener("pointerout", onLeave);
      document.removeEventListener("focusin", onEnter);
      document.removeEventListener("focusout", onLeave);
      window.clearTimeout(cueTimer.current);
      window.clearTimeout(hoverTimer.current);
    };
  }, []);

  const enter = () => {
    if (script) return;
    setHover("curious");
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHover("pointing"), 1100);
  };

  const leave = () => {
    window.clearTimeout(hoverTimer.current);
    setHover(null);
  };

  const vanish = () => {
    if (script) return;
    leave();
    setScript("stare");
    window.setTimeout(() => setScript("peace"), 1000);
    window.setTimeout(() => setPhase("leaving"), 1900);
    window.setTimeout(() => setPhase("gone"), 3000);
  };

  if (phase === "gone") return null;

  const pose = script ?? hover ?? cue ?? zone;
  const photo = mascotPhotos[pose];

  return (
    <div className={`${styles.wrap} ${phase === "leaving" ? styles.leaving : ""}`}>
      {pose === "sign" && (
        <p className={styles.sign}>
          <T v={sign} />
        </p>
      )}
      <button
        type="button"
        className={styles.mascot}
        onPointerEnter={enter}
        onPointerLeave={leave}
        onClick={vanish}
        aria-label={hideLabel}
        title={hideLabel}
        data-pose={pose}
      >
        <span key={pose} className={styles.frame}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" className={styles.photo} />
          ) : (
            <MascotFace pose={pose} />
          )}
        </span>
      </button>
    </div>
  );
}
