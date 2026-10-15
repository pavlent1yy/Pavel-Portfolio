import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landscape } from "@/components/Landscape";
import { T } from "@/components/T";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import styles from "./page.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: PageProps<"/[lang]/landscape-art">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { content } = getDictionary(lang);

  return (
    <main className={styles.cover}>
      <div className={styles.text}>
        <h1 className={styles.title}>
          <T v={content.cover.title} />
        </h1>
        <p className={styles.lead}>
          <T v={content.cover.text} />
        </p>
      </div>
      <Landscape className={styles.art} viewBox="0 236 1600 188" />
    </main>
  );
}
