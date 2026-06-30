export type SectionTitle =
  | string
  | {
      prefix: string;
      highlight: string;
      connector?: string;
    };

export function resolveSectionTitle(title: SectionTitle): {
  prefix: string;
  highlight: string;
  connector?: string;
} {
  if (typeof title === "object") {
    return title;
  }

  const words = title.trim().split(/\s+/);

  if (words.length === 1) {
    return { prefix: "", highlight: words[0] };
  }

  const highlight = words.pop()!;

  return { prefix: words.join(" "), highlight };
}
