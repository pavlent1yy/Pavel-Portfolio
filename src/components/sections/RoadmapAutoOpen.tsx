"use client";

import { useEffect } from "react";

export function RoadmapAutoOpen({ target }: { target: string }) {
  useEffect(() => {
    const open = () => {
      const details = document.getElementById(target);
      if (details instanceof HTMLDetailsElement) details.open = true;
    };
    const onHash = () => {
      if (location.hash === "#roadmap") open();
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href$='#roadmap']");
      if (link) open();
    };

    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, [target]);

  return null;
}
