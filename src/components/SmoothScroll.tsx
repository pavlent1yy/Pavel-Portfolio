"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1, wheelMultiplier: 0.9, anchors: { offset: -80 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
