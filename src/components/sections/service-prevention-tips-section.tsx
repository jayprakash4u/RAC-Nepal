import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { serviceIconRingClasses } from "@/components/sections/service-icon-card";
import type { ServicePreventionTipsSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function PreventionTipRow({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: { src: string; alt: string };
  index: number;
}) {
  return (
    <li
      className="group flex items-center gap-3 border-b border-slate-200 py-4 last:border-b-0 sm:gap-4 sm:py-5 motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          serviceIconRingClasses,
          "h-14 w-14 shrink-0 border-primary/20 bg-primary-soft/30 p-2 sm:h-16 sm:w-16 sm:p-2.5",
        )}
      >
        <Image
          src={icon.src}
          alt={icon.alt}
          width={128}
          height={128}
          className="service-icon-bounce h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="4rem"
          unoptimized
        />
      </div>

      <span
        aria-hidden="true"
        className="hidden h-px min-w-6 flex-1 border-t border-dashed border-primary/35 sm:block sm:max-w-12"
      />

      <div className="min-w-0 flex-1">
        <p className="text-[0.9375rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-primary sm:text-body">
          {title}
        </p>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
          {description}
        </p>
      </div>
    </li>
  );
}

function PreventionSideImage({
  sideImage,
}: {
  sideImage: { src: string; alt: string };
}) {
  return (
    <div className="flex h-full w-full justify-center self-stretch lg:justify-end">
      <div
        className={cn(
          "relative w-full overflow-hidden",
          "min-h-[14rem] sm:min-h-[24rem]",
          "rounded-[2rem] rounded-tl-[4.5rem] sm:rounded-tl-[5.5rem]",
          "lg:min-h-[32rem] lg:rounded-tl-[6rem] xl:min-h-[36rem] xl:rounded-tl-[7rem]",
          "shadow-[0_22px_50px_-32px_rgba(15,23,42,0.28)]",
        )}
      >
        <Image
          src={sideImage.src}
          alt={sideImage.alt}
          fill
          className="object-cover object-[center_30%]"
          sizes="(max-width: 1024px) 90vw, 42vw"
          unoptimized
        />
      </div>
    </div>
  );
}

export function ServicePreventionTipsSection({
  section,
}: {
  section: ServicePreventionTipsSectionData;
}) {
  const eyebrow = section.eyebrow ?? "Prevention Tips";
  const title =
    section.title ?? "Simple Steps for Stronger Bones Every Day";

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <header className="max-w-[36rem]">
              <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
                {eyebrow}
              </p>
              <span
                aria-hidden="true"
                className="mt-2 block h-1 w-10 rounded-full bg-primary sm:w-12"
              />

              <h2 className="font-display mt-md text-[1.625rem] font-semibold leading-tight tracking-tight text-pretty text-navy sm:text-[1.875rem] lg:text-[2rem]">
                {title}
              </h2>
            </header>

            <ul className="mt-6 sm:mt-8">
              {section.items.map((item, index) => (
                <PreventionTipRow
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  index={index}
                />
              ))}
            </ul>
          </div>

          <div className="relative flex h-full min-w-0 flex-col justify-center">
            {section.centerIcon ? (
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute top-1/2 left-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex",
                  "h-20 w-20 items-center justify-center rounded-full border-2 border-primary/20 bg-white p-3 shadow-md",
                )}
              >
                <Image
                  src={section.centerIcon.src}
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>
            ) : null}

            <PreventionSideImage sideImage={section.sideImage} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
