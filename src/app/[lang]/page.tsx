import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Mascot } from "@/components/Mascot";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Roadmap } from "@/components/sections/Roadmap";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { content, ui } = getDictionary(lang);

  return (
    <>
      <Header lang={lang} ui={ui} />
      <main>
        <Hero hero={content.hero} ui={ui} lang={lang} />
        <About about={content.about} ui={ui} />
        <Projects projects={content.projects} ui={ui} lang={lang} />
        <Roadmap roadmap={content.roadmap} ui={ui} />
        <Faq faq={content.faq} ui={ui} />
        <Contact contact={content.contact} ui={ui} />
      </main>
      <Footer lang={lang} colophon={content.colophon} />
      <Mascot sign={content.mascot.sign} hideLabel={ui.mascot.hide} />
    </>
  );
}
