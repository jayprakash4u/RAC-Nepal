import Image from "next/image";
import { Container, Section } from "@/components/ui";
import type { ServicePhotoSymptomsSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function PhotoSymptomCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: { src: string; alt: string };
}) {
  return (
    <article
      className={cn(
        "group flex h-full w-full flex-col items-center rounded-2xl border border-slate-200/80 bg-primary-soft/20 px-sm py-md text-center sm:px-md sm:py-lg",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/20 hover:bg-primary-soft/30",
        "hover:shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_28%,transparent)]",
      )}
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-sm sm:h-28 sm:w-28">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="7rem"
          unoptimized
        />
      </div>

      <p className="mt-md text-[0.875rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-primary sm:text-small">
        {title}
      </p>

      <span
        aria-hidden="true"
        className="mt-sm block h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-10"
      />

      <p className="mt-sm text-[0.75rem] leading-relaxed text-slate-600 sm:text-[0.8125rem]">
        {description}
      </p>
    </article>
  );
}

export function ServicePhotoSymptomsSection({
  section,
}: {
  section: ServicePhotoSymptomsSectionData;
}) {
  const title = section.title ?? {
    prefix: "Symptoms of",
    highlight: "Gout",
  };

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <span
            aria-hidden="true"
            className="block h-1 w-14 rounded-full bg-primary"
          />

          <h2 className="font-display mt-md text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.375rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
          </h2>

          {section.description ? (
            <p className="mt-md max-w-[36rem] text-small leading-relaxed text-slate-600 sm:text-[0.9375rem]">
              {section.description}
            </p>
          ) : null}
        </header>

        <ul className="mt-3xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
          {section.items.map((item, index) => (
            <li
              key={item.title}
              className="flex motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <PhotoSymptomCard
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </li>
          ))}
        </ul>

        {section.callout ? (
          <div
            className={cn(
              "mt-3xl rounded-2xl border border-slate-200/80 bg-primary-soft/25 px-md py-md motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none sm:px-lg sm:py-lg",
              "border-l-[3px] border-l-primary",
            )}
            style={{ animationDelay: "280ms" }}
          >
            <p className="text-center text-small leading-relaxed text-slate-600 sm:text-left sm:text-[0.9375rem]">
              {section.callout.message}
            </p>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
