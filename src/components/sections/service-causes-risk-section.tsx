import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { serviceIconRingClasses } from "@/components/sections/service-icon-card";
import type { ServiceCausesRiskSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function CauseRiskCard({
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
      className="motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <article
        className={cn(
          "group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm sm:gap-4 sm:px-5 sm:py-4",
          "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-md",
        )}
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

        <div className="min-w-0 flex-1">
          <p className="text-[0.9375rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-primary sm:text-body">
            {title}
          </p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
            {description}
          </p>
        </div>
      </article>
    </li>
  );
}

function CausesRiskSideImage({
  sideImage,
}: {
  sideImage: { src: string; alt: string };
}) {
  return (
    <div className="flex h-full w-full justify-center self-stretch motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none lg:justify-end">
      <div className="relative min-h-[20rem] w-full overflow-hidden rounded-2xl shadow-[0_16px_40px_-28px_rgba(15,23,42,0.28)] sm:min-h-[24rem] lg:min-h-[28rem] lg:max-h-[32rem] xl:min-h-[30rem]">
        <Image
          src={sideImage.src}
          alt={sideImage.alt}
          fill
          className="object-cover object-[center_25%]"
          sizes="(max-width: 1024px) 90vw, 42vw"
          unoptimized
        />
      </div>
    </div>
  );
}

export function ServiceCausesRiskSection({
  section,
}: {
  section: ServiceCausesRiskSectionData;
}) {
  const title = section.title ?? {
    prefix: "Causes &",
    highlight: "Risk Factors",
  };

  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <header className="max-w-[36rem]">
              <span
                aria-hidden="true"
                className="block h-0.5 w-12 rounded-full bg-primary sm:h-1 sm:w-14"
              />

              <h2 className="font-display mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:mt-4 sm:text-[2rem] lg:text-[2.125rem]">
                <span className="text-navy">{title.prefix} </span>
                <span className="text-primary">{title.highlight}</span>
              </h2>
            </header>

            <ul className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-3.5">
              {section.items.map((item, index) => (
                <CauseRiskCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  index={index}
                />
              ))}
            </ul>
          </div>

          <CausesRiskSideImage sideImage={section.sideImage} />
        </div>
      </Container>
    </Section>
  );
}
