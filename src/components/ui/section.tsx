import { cn } from "@/lib/cn";

const backgroundStyles = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  navy: "bg-navy text-white",
  hero: "bg-hero-surface text-foreground",
} as const;

const spacingStyles = {
  none: "",
  default: "section-padding",
  compact: "section-y",
  flushTop: "section-flush-top",
  hero: "section-hero-y",
  page: "page-hero-padding",
} as const;

export type SectionBackground = keyof typeof backgroundStyles;
export type SectionSpacing = keyof typeof spacingStyles;

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  background?: SectionBackground;
  spacing?: SectionSpacing;
};

export function Section({
  background = "default",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        backgroundStyles[background],
        spacingStyles[spacing],
        className,
      )}
      {...props}
    />
  );
}
