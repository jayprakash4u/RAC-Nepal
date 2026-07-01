import { SectionDisplayTitle } from "@/components/ui/section-display-title";
import type { SectionTitle } from "@/types/section-title";
import { cn } from "@/lib/cn";

export type SectionHeaderProps = {
  eyebrow?: string;
  title: SectionTitle;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  decoratedEyebrow?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  decoratedEyebrow = false,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full flex-col",
        align === "center" && "section-intro mx-auto items-center text-center",
        align === "left" && "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        decoratedEyebrow && align === "center" ? (
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "h-px w-10 sm:w-12",
                inverted ? "bg-white/70" : "bg-primary",
              )}
            />
            <p
              className={cn(
                "font-display text-eyebrow font-semibold tracking-[0.18em] uppercase",
                inverted ? "text-primary-soft" : "text-primary",
              )}
            >
              {eyebrow}
            </p>
            <span
              aria-hidden="true"
              className={cn(
                "h-px w-10 sm:w-12",
                inverted ? "bg-white/70" : "bg-primary",
              )}
            />
          </div>
        ) : (
          <p
            className={cn(
              "font-display text-eyebrow font-semibold tracking-[0.18em] uppercase",
              inverted ? "text-primary-soft" : "text-primary",
            )}
          >
            {eyebrow}
          </p>
        )
      ) : null}

      <div
        className={cn(
          "flex w-full flex-col",
          align === "center" && "items-center",
          align === "left" && "items-start",
        )}
      >
        <SectionDisplayTitle
          title={title}
          inverted={inverted}
          className={cn("w-full", eyebrow && "mt-sm")}
        />

        <span
          aria-hidden="true"
          className={cn(
            "mt-sm block h-1 w-16 shrink-0 rounded-full",
            inverted ? "bg-white/90" : "bg-primary",
          )}
        />
      </div>

      {description ? (
        <p
          className={cn(
            "text-body mt-md text-pretty",
            align === "center" ? "w-full" : "max-w-[40rem]",
            inverted ? "text-white/80" : "text-slate-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
