import type { Text } from "@/content/types";

export function T({ v }: { v: Text }) {
  if (typeof v === "string") return v;
  return <span className="todo">{v.todo}</span>;
}
