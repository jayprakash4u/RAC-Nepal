import { JointStyledText } from "@/components/ui/joint-styled-text";
import { resolveSectionTitle, type SectionTitle } from "@/types/section-title";
import { cn } from "@/lib/cn";

export type SectionDisplayTitleProps = {
  title: SectionTitle;
  inverted?: boolean;
  className?: string;
};

export function SectionDisplayTitle({
  title,
  inverted = false,
  className,
}: SectionDisplayTitleProps) {
  const { prefix, highlight, connector } = resolveSectionTitle(title);
  const separator = connector ? ` ${connector} ` : " ";

  return (
    <h2
      className={cn(
        "font-display w-full text-h2 leading-[1.15] tracking-tight text-pretty lg:text-[2.5rem]",
        className,
      )}
    >
      {prefix ? (
        <span
          className={cn(
            "font-semibold",
            inverted ? "text-white" : "text-navy",
          )}
        >
          {prefix}
        </span>
      ) : null}

      {prefix ? (
        <span
          className={cn(
            "font-semibold",
            inverted ? "text-white" : "text-navy",
          )}
        >
          {separator}
        </span>
      ) : null}

      <span
        className={cn(
          "font-semibold",
          inverted ? "text-primary-soft" : "text-primary",
        )}
      >
        <JointStyledText text={highlight} />
      </span>
    </h2>
  );
}
