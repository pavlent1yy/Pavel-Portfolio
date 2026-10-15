"use client";

import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/config/site";
import { FlIcon, FreelanceIcon, KworkIcon } from "../Icons";
import styles from "./Hero.module.css";

type Marketplace = (typeof site.marketplaces)[number];

const icons = { kwork: KworkIcon, fl: FlIcon, freelance: FreelanceIcon };

export function PresenceStatus({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [online, setOnline] = useState<Marketplace[] | null>(null);

  useEffect(() => {
    fetch("/api/presence")
      .then((response) => response.json())
      .then((data: { online: Marketplace[] }) => setOnline(data.online))
      .catch(() => setOnline([]));
  }, []);

  if (online === null) return <span className={styles.pending}>{children}</span>;
  if (online.length === 0) return <span className={styles.appear}>{children}</span>;

  return (
    <>
      <span className={styles.offline}>{children}</span>
      <div className={`${styles.onlineBox} ${styles.appear}`}>
        {label}
        <ul className={styles.onlineList}>
          {online.map((id) => {
            const Icon = icons[id];
            return (
              <li key={id}>
                <a
                  className={styles.online}
                  href={site.contacts[id].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon />
                  {site.contacts[id].name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
