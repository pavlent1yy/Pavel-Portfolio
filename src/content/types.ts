export type Todo = { todo: string };

export type Text = string | Todo;

export const todo = (hint: string): Todo => ({ todo: hint });

export const plain = (text: Text): string => (typeof text === "string" ? text : "");

export const raw = (text: Text): string => (typeof text === "string" ? text : text.todo);

export type Shot = { src?: string; width?: number; height?: number; caption: Text };

export type Project = {
  slug: string;
  name: string;
  year: number;
  kind: Text;
  summary: Text;
  stack: string[];
  repo?: string;
  live?: string;
  human: Text[];
  tech: Text[];
  shots: Shot[];
};

export type Milestone = {
  year: string;
  items: { title: Text; text: Text }[];
  note?: Text;
};

export type Question = { q: Text; a: Text };

export type Content = {
  meta: { description: Text };
  hero: { status: Text; city: Text; headline: Text; lead: Text; note: Text };
  about: {
    text: Text[];
    photo?: string;
    principles: { title: Text; text: Text }[];
  };
  projects: {
    intro: Text;
    featured: string;
    items: Project[];
    note: Text;
    page: { intro: Text; note: Text };
  };
  roadmap: {
    intro: Text;
    timeline: Milestone[];
    next: Text[];
    skills: { strong: Text[]; learning: Text[]; side: Text[] };
  };
  faq: { clients: Question[]; employers: Question[] };
  contact: { headline: Text; text: Text; note: Text };
  mascot: { sign: Text };
  colophon: Text;
};
