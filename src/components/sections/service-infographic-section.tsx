import Image from "next/image";
import { Container, Section } from "@/components/ui";
import type { ServiceInfographicSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function MobileHighlightsList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:hidden">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft/50 text-primary"
          >
            <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
              <path
                d="M2.5 6l2.5 2.5L9.5 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[0.9375rem] font-medium leading-snug text-navy">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceInfographicSection({
  section,
}: {
  section: ServiceInfographicSectionData;
}) {
  const title = section.title ?? {
    prefix: "Benefits of",
    highlight: "Osteoporosis Care",
  };

  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <h2 className="font-display text-[1.5rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.375rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-14 rounded-full bg-primary"
          />
        </header>

        <div className="mt-2xl sm:mt-3xl">
          {section.mobileHighlights?.length ? (
            <MobileHighlightsList items={section.mobileHighlights} />
          ) : null}

          <div
            className={cn(
              section.mobileHighlights?.length && "hidden sm:block",
            )}
          >
            <Image
              src={section.image.src}
              alt={section.image.alt}
              width={1400}
              height={900}
              className="mx-auto h-auto w-full max-w-[72rem] object-contain"
              sizes="(max-width: 1280px) 100vw, 72rem"
              unoptimized
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
