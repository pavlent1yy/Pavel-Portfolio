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
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
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
        <Services services={content.services} extra={content.extraServices} projects={content.projects.items} ui={ui} lang={lang} />
        <Projects projects={content.projects} ui={ui} lang={lang} />
        <Skills skills={content.roadmap.skills} ui={ui} />
        <Faq faq={content.faq} ui={ui} />
        <Roadmap roadmap={content.roadmap} ui={ui} />
        <Contact contact={content.contact} ui={ui} />
      </main>
      <Footer lang={lang} colophon={content.colophon} />
      <Mascot sign={content.mascot.sign} hideLabel={ui.mascot.hide} />
    </>
  );
}
