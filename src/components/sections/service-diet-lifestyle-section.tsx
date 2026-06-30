import Image from "next/image";
import { Container, Section } from "@/components/ui";
import type {
  ServiceDietLifestyleColumnData,
  ServiceDietLifestyleSectionData,
} from "@/types/service-content";
import { cn } from "@/lib/cn";

function ColumnHeaderIcon({ variant }: { variant: "avoid" | "include" }) {
  if (variant === "avoid") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-3.5 w-3.5 shrink-0"
        fill="none"
      >
        <path
          d="M5 5l10 10M15 5L5 15"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
    >
      <path
        d="M4.5 10.5l4 4 7.5-8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ColumnPillHeader({
  title,
  variant,
}: {
  title: string;
  variant: "avoid" | "include";
}) {
  const isAvoid = variant === "avoid";

  return (
    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-full px-5 py-2.5 text-white shadow-md",
          "min-w-[11.5rem] justify-center sm:min-w-[12.5rem] sm:px-6 sm:py-3",
          isAvoid ? "bg-[#d32f2f]" : "bg-[#388e3c]",
        )}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/25 text-white sm:h-7 sm:w-7">
          <ColumnHeaderIcon variant={variant} />
        </span>
        <h3 className="text-[0.875rem] font-semibold leading-none sm:text-[0.9375rem]">
          {title}
        </h3>
      </div>
    </div>
  );
}

function DietLifestyleItem({
  title,
  description,
  image,
  variant,
  index,
}: {
  title: string;
  description: string;
  image: { src: string; alt: string };
  variant: "avoid" | "include";
  index: number;
}) {
  const marker = variant === "avoid" ? "❌" : "✅";

  return (
    <li
      className="group flex items-center gap-3 border-t border-black/[0.06] py-4 first:border-t-0 first:pt-0 motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none sm:gap-4 sm:py-5"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="4.5rem"
          unoptimized
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[0.9375rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-primary sm:text-body">
          <span aria-hidden="true" className="mr-1">
            {marker}
          </span>
          {title}
        </p>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
          {description}
        </p>
      </div>
    </li>
  );
}

function DietLifestyleColumn({
  column,
  variant,
  columnIndex,
}: {
  column: ServiceDietLifestyleColumnData;
  variant: "avoid" | "include";
  columnIndex: number;
}) {
  const isAvoid = variant === "avoid";

  return (
    <article
      className={cn(
        "relative rounded-2xl border pt-9 shadow-sm motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none sm:pt-10",
        "transition-shadow duration-300 hover:shadow-md",
        isAvoid
          ? "border-red-200/80 bg-[#fff5f5]"
          : "border-emerald-200/80 bg-[#f1f8e9]",
      )}
      style={{ animationDelay: `${columnIndex * 100}ms` }}
    >
      <ColumnPillHeader title={column.title} variant={variant} />

      <ul className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 sm:pt-2">
        {column.items.map((item, index) => (
          <DietLifestyleItem
            key={item.title}
            title={item.title}
            description={item.description}
            image={item.image}
            variant={variant}
            index={index}
          />
        ))}
      </ul>
    </article>
  );
}

function FooterShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-10 w-10 shrink-0 text-[#1976d2]"
      fill="currentColor"
    >
      <path d="M16 2.5 6 6.5v8.8c0 6.1 4.3 11.8 10 13.2 5.7-1.4 10-7.1 10-13.2V6.5L16 2.5zm1.2 17.3-3.8-3.8 1.4-1.4 2.4 2.4 5.4-5.4 1.4 1.4-6.8 6.8z" />
    </svg>
  );
}

function FooterWellnessIcons() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-end gap-2 text-primary"
    >
      <svg viewBox="0 0 40 48" className="h-11 w-9" fill="currentColor">
        <circle cx="20" cy="7" r="5" />
        <path d="M12 18c0-2.2 3.6-4 8-4s8 1.8 8 4v2H12v-2z" />
        <path d="M10 22h20v3c0 8-4 14-10 18-6-4-10-10-10-18v-3z" />
        <path d="M8 26c2 4 5 7 12 10 7-3 10-6 12-10v14H8V26z" opacity="0.35" />
      </svg>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 3c-1.5 2.5-4 4.5-4 7.5a4 4 0 0 0 8 0c0-3-2.5-5-4-7.5z" />
      </svg>
      <svg viewBox="0 0 24 24" className="mb-1 h-4 w-4" fill="currentColor">
        <path d="M12 3c-1.5 2.5-4 4.5-4 7.5a4 4 0 0 0 8 0c0-3-2.5-5-4-7.5z" />
      </svg>
    </div>
  );
}

export function ServiceDietLifestyleSection({
  section,
}: {
  section: ServiceDietLifestyleSectionData;
}) {
  const title = section.title ?? {
    prefix: "Diet & Lifestyle",
    highlight: "Guidance",
  };

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.375rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
          </h2>

          {section.description ? (
            <p className="mt-md max-w-[38rem] text-small leading-relaxed text-slate-600 sm:text-[0.9375rem]">
              {section.description}
            </p>
          ) : null}

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-14 rounded-full bg-primary"
          />
        </header>

        <div className="mt-3xl grid gap-8 lg:grid-cols-2 lg:gap-6">
          <DietLifestyleColumn
            column={section.avoid}
            variant="avoid"
            columnIndex={0}
          />
          <DietLifestyleColumn
            column={section.include}
            variant="include"
            columnIndex={1}
          />
        </div>

        {section.callout ? (
          <div
            className={cn(
              "mt-3xl flex flex-col items-center gap-4 rounded-2xl bg-[#e3f2fd] px-md py-md motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none sm:flex-row sm:items-center sm:gap-5 sm:px-lg sm:py-lg",
            )}
            style={{ animationDelay: "180ms" }}
          >
            <FooterShieldIcon />

            <p className="flex-1 text-center text-small leading-relaxed text-slate-700 sm:text-left sm:text-[0.9375rem]">
              {section.callout.message}
            </p>

            <FooterWellnessIcons />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
