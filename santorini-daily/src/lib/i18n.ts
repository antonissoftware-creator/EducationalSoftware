export type Language = "en" | "el";

export function getLanguage(input: string | null | undefined): Language {
  return input === "el" ? "el" : "en";
}

export function pickLocalized<T extends { [k: string]: unknown }>(obj: T, enKey: keyof T, elKey: keyof T, lang: Language): string {
  const val = lang === "el" ? obj[elKey] : obj[enKey];
  return typeof val === "string" ? val : "";
}
