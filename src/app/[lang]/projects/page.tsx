import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Mascot } from "@/components/Mascot";
import { ModeProvider } from "@/components/projects/Mode";
import { ProjectsPage } from "@/components/projects/ProjectsPage";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { ui } = getDictionary(lang);
  return {
    title: ui.projects.title,
    alternates: {
      canonical: `/${lang}/projects`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/projects`])),
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { content, ui } = getDictionary(lang);

  return (
    <>
      <Header lang={lang} ui={ui} path="/projects" />
      <ModeProvider>
        <main data-mascot-zone="laptop">
          <ProjectsPage projects={content.projects} ui={ui} lang={lang} />
        </main>
      </ModeProvider>
      <Footer lang={lang} colophon={content.colophon} />
      <Mascot sign={content.mascot.sign} hideLabel={ui.mascot.hide} />
    </>
  );
}
