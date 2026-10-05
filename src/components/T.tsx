import type { Text } from "@/content/types";
import { Age } from "./Age";

const withAge = (text: string) =>
  text.includes("{age}")
    ? text.split("{age}").flatMap((part, i) => (i ? [<Age key={i} />, part] : [part]))
    : text;

export function T({ v }: { v: Text }) {
  if (typeof v === "string") return withAge(v);
  return <span className="todo">{withAge(v.todo)}</span>;
}
