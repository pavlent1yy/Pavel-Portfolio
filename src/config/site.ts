export const site = {
  name: { ru: "Павел Хухарев", en: "Pavel Khuharev" },
  timeZone: "Europe/Moscow",
  birthDate: "2007-08-15",
  resume: "",
  contacts: {
    telegram: { handle: "@pavlentiyy1", url: "https://t.me/pavlentiyy1" },
    email: "phuharev@gmail.com",
    github: { handle: "pavlent1yy", url: "https://github.com/pavlent1yy" },
    vk: { url: "" },
    linkedin: { url: "" },
  },
  presence: ["telegram", "vk", "github", "linkedin"] as const,
};
