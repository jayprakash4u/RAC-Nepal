import { cn } from "@/lib/cn";
import type { TypographyToken } from "@/types/design-tokens";

const levelStyles: Record<TypographyToken, string> = {
  hero: "text-hero text-navy",
  h1: "text-h1 text-navy",
  h2: "text-h2 text-navy",
  h3: "text-h3 text-navy",
  body: "text-body text-foreground",
  small: "text-small text-foreground",
};

const defaultTags: Record<
  TypographyToken,
  "h1" | "h2" | "h3" | "h4" | "p" | "span"
> = {
  hero: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  small: "p",
};

const invertedStyles: Record<TypographyToken, string> = {
  hero: "text-white",
  h1: "text-white",
  h2: "text-white",
  h3: "text-white",
  body: "text-slate-100",
  small: "text-slate-100",
};

export type HeadingLevel = TypographyToken;

export type HeadingProps = React.HTMLAttributes<HTMLElement> & {
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  inverted?: boolean;
};

export function Heading({
  level = "h2",
  as,
  inverted = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as ?? defaultTags[level];

  return (
    <Component
      className={cn(
        levelStyles[level],
        inverted && invertedStyles[level],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
