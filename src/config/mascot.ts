export type Pose =
  | "idle"
  | "curious"
  | "pointing"
  | "rubEyes"
  | "squint"
  | "laptop"
  | "book"
  | "joy"
  | "sign"
  | "stare"
  | "peace";

export const mascotPhotos: Partial<Record<Pose, string>> = {};

export const cueMascot = (pose: Pose, ms = 1800) => {
  window.dispatchEvent(new CustomEvent("mascot", { detail: { pose, ms } }));
};
