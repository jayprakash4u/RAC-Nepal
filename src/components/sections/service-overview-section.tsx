import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { serviceIconRingClasses } from "@/components/sections/service-icon-card";
import type { ServiceOverviewSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function DefaultFeatureItem({
  title,
  description,
  image,
  titleClassName,
}: {
  title: string;
  description?: string;
  image: { src: string; alt: string };
  titleClassName: string;
}) {
  return (
    <li className="flex items-center gap-md sm:gap-lg">
      <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
        <Image
          src={image.src}
          alt={image.alt}
          width={128}
          height={128}
          className="h-full w-full object-contain mix-blend-multiply"
          sizes="4rem"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className={cn("text-[0.875rem] font-semibold leading-snug tracking-normal", titleClassName)}>
          {title}
        </p>
        {description ? (
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600">
            {description}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function EditorialFeatureItem({
  title,
  description,
  image,
  index,
}: {
  title: string;
  description?: string;
  image: { src: string; alt: string };
  index: number;
}) {
  return (
    <li
      className="group flex items-center gap-md py-2.5 transition-colors duration-300 hover:bg-primary-soft/10 motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none sm:gap-lg sm:-mx-2 sm:rounded-xl sm:px-2 sm:py-3"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          serviceIconRingClasses,
          "h-14 w-14 shrink-0 bg-white p-2 sm:h-16 sm:w-16 sm:p-2.5",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={128}
          height={128}
          className="service-icon-bounce h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
          sizes="4rem"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[0.875rem] font-semibold leading-snug tracking-normal text-primary transition-colors duration-300 group-hover:text-primary-dark">
          {title}
        </p>
        {description ? (
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600">
            {description}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function DefaultOverviewContent({
  section,
}: {
  section: ServiceOverviewSectionData;
}) {
  const title = section.title;

  return (
    <div className="w-full lg:max-w-[36rem]">
      <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
        {section.eyebrow ?? "Understanding Autoimmune Diseases"}
      </p>

      <span
        aria-hidden="true"
        className="mt-sm block h-0.5 w-10 rounded-full bg-primary sm:h-1 sm:w-12"
      />

      <h1 className="font-display mt-md text-[2rem] font-semibold leading-[1.15] tracking-tight text-pretty sm:text-[2.5rem] lg:text-[2.75rem]">
        <span className="text-navy">{title.prefix} </span>
        <span className="text-primary">{title.highlight}</span>
        {title.suffix ? (
          <span className="text-primary">{title.suffix}</span>
        ) : null}
      </h1>

      <p className="text-body mt-lg max-w-[32rem] leading-[1.85] text-slate-600">
        {section.description}
      </p>

      <ul className="mt-2xl flex max-w-[34rem] flex-col gap-xl">
        {section.features.map((feature) => (
          <DefaultFeatureItem
            key={feature.title}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            titleClassName="text-primary"
          />
        ))}
      </ul>

      {section.callout ? (
        <div className="mt-2xl flex max-w-[34rem] items-center gap-md rounded-xl border border-primary/10 bg-primary-soft/35 px-lg py-md sm:gap-lg sm:rounded-2xl sm:px-xl sm:py-lg">
          <Image
            src={section.callout.image.src}
            alt={section.callout.image.alt}
            width={236}
            height={230}
            className="h-12 w-12 shrink-0 object-contain mix-blend-multiply sm:h-14 sm:w-14"
            sizes="3.5rem"
          />
          <p className="text-small font-semibold leading-relaxed text-primary sm:text-body">
            {section.callout.message}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function CardFeatureItem({
  title,
  description,
  image,
  index,
}: {
  title: string;
  description?: string;
  image: { src: string; alt: string };
  index: number;
}) {
  return (
    <li
      className="motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <article className="group flex h-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-md sm:gap-4 sm:px-5 sm:py-4">
        <div
          className={cn(
            serviceIconRingClasses,
            "h-14 w-14 shrink-0 border-primary/15 bg-primary-soft/35 p-2 sm:h-16 sm:w-16 sm:p-2.5",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
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
          {description ? (
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
              {description}
            </p>
          ) : null}
        </div>
      </article>
    </li>
  );
}

function SplitIntroSideImage({
  sideImage,
}: {
  sideImage: { src: string; alt: string };
}) {
  return (
    <div className="relative mt-6 w-full overflow-hidden rounded-2xl shadow-[0_16px_40px_-28px_rgba(15,23,42,0.28)] sm:mt-7">
      <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
        <Image
          src={sideImage.src}
          alt={sideImage.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 90vw, 42vw"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}

function IntroCtaIcon({ variant }: { variant: "primary" | "outline" }) {
  if (variant === "primary") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4 shrink-0"
        fill="none"
      >
        <rect
          x="3"
          y="4"
          width="14"
          height="13"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 8h14M7 2.5V5M13 2.5V5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="M4 11v3a2 2 0 0 0 2 2h1.2a2 2 0 0 0 1.4-.6l.9-.9M16 11v3a2 2 0 0 1-2 2h-1.2a2 2 0 0 1-1.4-.6l-.9-.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 10a3 3 0 1 0 6 0v-1a3 3 0 0 0-6 0v1z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10 6V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IntroCtaButton({
  href,
  label,
  icon,
  variant,
}: {
  href: string;
  label: string;
  icon?: { src: string; alt: string };
  variant: "primary" | "outline";
}) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full px-5",
        "text-[0.875rem] font-medium transition-colors duration-300 sm:min-w-[12.5rem] sm:flex-none sm:px-6 sm:text-body",
        isPrimary
          ? "bg-primary text-white hover:bg-primary-dark"
          : "border-2 border-primary bg-white text-primary hover:bg-primary-soft/25",
      )}
    >
      {icon ? (
        <span className="relative h-4 w-4 shrink-0">
          <Image
            src={icon.src}
            alt={icon.alt}
            fill
            className="object-contain"
            sizes="1rem"
            unoptimized
          />
        </span>
      ) : (
        <IntroCtaIcon variant={variant} />
      )}
      {label}
      <span
        aria-hidden="true"
        className={isPrimary ? "text-white/80" : "text-primary/70"}
      >
        →
      </span>
    </Link>
  );
}

function SplitIntroCtaButton({
  href,
  label,
  icon,
  variant,
}: {
  href: string;
  label: string;
  icon?: { src: string; alt: string };
  variant: "primary" | "outline";
}) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full px-5",
        "text-[0.875rem] font-medium transition-colors duration-300 sm:min-w-[12.5rem] sm:flex-none sm:px-6 sm:text-body",
        isPrimary
          ? "bg-navy text-white hover:bg-primary-dark"
          : "border-2 border-primary bg-white text-primary hover:bg-primary-soft/25",
      )}
    >
      {icon ? (
        <span className="relative h-4 w-4 shrink-0">
          <Image
            src={icon.src}
            alt={icon.alt}
            fill
            className="object-contain"
            sizes="1rem"
            unoptimized
          />
        </span>
      ) : null}
      {label}
      <span
        aria-hidden="true"
        className={isPrimary ? "text-white/80" : "text-primary/70"}
      >
        →
      </span>
    </Link>
  );
}

function SplitIntroLeftColumn({
  section,
}: {
  section: ServiceOverviewSectionData;
}) {
  const title = section.title;

  return (
    <div className="w-full motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none lg:py-1">
      <h1 className="font-display text-[1.875rem] font-bold uppercase leading-[1.1] tracking-[0.04em] text-pretty sm:text-[2.25rem] lg:text-[2.5rem]">
        <span className="text-navy">{title.prefix} </span>
        <span className="text-primary">{title.highlight}</span>
        {title.suffix ? (
          <span className="text-navy"> {title.suffix}</span>
        ) : null}
      </h1>

      {section.badgeIcon || section.introSubheading ? (
        <div className="mt-4 flex items-center gap-3 sm:mt-5">
          {section.badgeIcon ? (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12">
              <Image
                src={section.badgeIcon.src}
                alt={section.badgeIcon.alt}
                width={96}
                height={96}
                className="h-full w-full object-contain"
                sizes="3rem"
                priority
                unoptimized
              />
            </div>
          ) : null}

          {section.introSubheading ? (
            <h2 className="text-[1.0625rem] font-semibold text-navy sm:text-[1.125rem]">
              {section.introSubheading}
            </h2>
          ) : null}
        </div>
      ) : null}

      <p className="mt-3 max-w-[34rem] text-small leading-relaxed text-slate-600 sm:mt-4 sm:text-[0.9375rem]">
        {section.description}
      </p>

      {section.secondaryDescription ? (
        <p className="mt-3 max-w-[34rem] text-small leading-relaxed text-slate-600 sm:mt-4 sm:text-[0.9375rem]">
          {section.secondaryDescription}
        </p>
      ) : null}

      <SplitIntroSideImage sideImage={section.sideImage} />

      {section.primaryCta || section.secondaryCta ? (
        <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
          {section.primaryCta ? (
            <SplitIntroCtaButton
              href={section.primaryCta.href}
              label={section.primaryCta.label}
              icon={section.primaryCta.icon}
              variant="primary"
            />
          ) : null}
          {section.secondaryCta ? (
            <SplitIntroCtaButton
              href={section.secondaryCta.href}
              label={section.secondaryCta.label}
              icon={section.secondaryCta.icon}
              variant="outline"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function SplitIntroFeatureCards({
  section,
}: {
  section: ServiceOverviewSectionData;
}) {
  return (
    <ul className="flex flex-col gap-3 sm:gap-3.5 lg:py-1">
      {section.features.map((feature, index) => (
        <CardFeatureItem
          key={feature.title}
          index={index}
          title={feature.title}
          description={feature.description}
          image={feature.image}
        />
      ))}
    </ul>
  );
}

function ServiceIntroOverviewContent({
  section,
}: {
  section: ServiceOverviewSectionData;
}) {
  const title = section.title;

  return (
    <div className="w-full motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none lg:py-1 lg:pl-2">
      <span
        aria-hidden="true"
        className="block h-0.5 w-12 rounded-full bg-primary sm:h-1 sm:w-14"
      />

      {section.eyebrow ? (
        <p className="font-display mt-3 text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase sm:mt-4">
          {section.eyebrow}
        </p>
      ) : null}

      <h1
        className={cn(
          "font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:text-[2rem] lg:text-[2.125rem]",
          section.eyebrow ? "mt-2 sm:mt-3" : "mt-3 sm:mt-4",
        )}
      >
        <span className="text-navy">{title.prefix} </span>
        <span className="text-primary">{title.highlight}</span>
        {title.suffix ? (
          <span className="text-navy"> {title.suffix}</span>
        ) : null}
      </h1>

      <p className="mt-4 max-w-[34rem] text-small leading-relaxed text-slate-600 sm:mt-5 sm:text-[0.9375rem]">
        {section.description}
      </p>

      {section.secondaryDescription ? (
        <p className="mt-4 max-w-[34rem] text-small leading-relaxed text-slate-600 sm:mt-5 sm:text-[0.9375rem]">
          {section.secondaryDescription}
        </p>
      ) : null}

      <ul className="mt-5 flex max-w-[34rem] flex-col gap-3 sm:mt-6 sm:gap-3.5">
        {section.features.map((feature, index) => (
          <CardFeatureItem
            key={feature.title}
            index={index}
            title={feature.title}
            description={feature.description}
            image={feature.image}
          />
        ))}
      </ul>

      {section.primaryCta || section.secondaryCta ? (
        <div className="mt-6 flex max-w-[34rem] flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          {section.primaryCta ? (
            <IntroCtaButton
              href={section.primaryCta.href}
              label={section.primaryCta.label}
              icon={section.primaryCta.icon}
              variant="primary"
            />
          ) : null}
          {section.secondaryCta ? (
            <IntroCtaButton
              href={section.secondaryCta.href}
              label={section.secondaryCta.label}
              icon={section.secondaryCta.icon}
              variant="outline"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function EditorialOverviewContent({
  section,
}: {
  section: ServiceOverviewSectionData;
}) {
  const title = section.title;

  return (
    <div className="w-full lg:py-1 lg:pl-2">
      <span
        aria-hidden="true"
        className="block h-0.5 w-12 rounded-full bg-primary sm:h-1 sm:w-14"
      />

      <h1 className="font-display mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:mt-4 sm:text-[2rem] lg:text-[2.125rem]">
        <span className="text-navy">{title.prefix} </span>
        <span className="text-primary">{title.highlight}</span>
        {title.suffix ? (
          <span className="text-navy"> {title.suffix}</span>
        ) : null}
      </h1>

      <p className="mt-4 max-w-[34rem] text-small leading-relaxed text-slate-600 sm:mt-5 sm:text-[0.9375rem]">
        {section.description}
      </p>

      {section.secondaryDescription ? (
        <>
          <div
            aria-hidden="true"
            className="mt-4 h-px w-full max-w-[34rem] bg-slate-200 sm:mt-5"
          />
          <p className="mt-4 max-w-[34rem] text-small leading-relaxed text-slate-600 sm:mt-5 sm:text-[0.9375rem]">
            {section.secondaryDescription}
          </p>
        </>
      ) : null}

      <ul className="mt-5 max-w-[34rem] divide-y divide-slate-200 border-y border-slate-200 sm:mt-6">
        {section.features.map((feature, index) => (
          <EditorialFeatureItem
            key={feature.title}
            index={index}
            title={feature.title}
            description={feature.description}
            image={feature.image}
          />
        ))}
      </ul>
    </div>
  );
}

function DefaultSideImage({
  sideImage,
}: {
  sideImage: { src: string; alt: string };
}) {
  return (
    <div className="flex w-full justify-center lg:justify-end">
      <div className="relative w-full max-w-[24rem] overflow-hidden rounded-2xl shadow-[0_22px_50px_-32px_rgba(15,23,42,0.28)] sm:max-w-[28rem] lg:max-w-[34rem]">
        <Image
          src={sideImage.src}
          alt={sideImage.alt}
          width={525}
          height={599}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 90vw, 34rem"
          priority
        />
      </div>
    </div>
  );
}

function EditorialSideImage({
  sideImage,
}: {
  sideImage: { src: string; alt: string };
}) {
  return (
    <div className="flex h-full w-full justify-center self-stretch motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none lg:justify-start">
      <div className="relative min-h-[18rem] w-full overflow-hidden rounded-2xl shadow-[0_16px_40px_-28px_rgba(15,23,42,0.28)] sm:min-h-[22rem] lg:min-h-[28rem] lg:max-h-[32rem] xl:min-h-[30rem]">
        <Image
          src={sideImage.src}
          alt={sideImage.alt}
          fill
          className="object-cover object-[center_20%]"
          sizes="(max-width: 1024px) 90vw, 50vw"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}

export function ServiceOverviewSection({
  section,
}: {
  section: ServiceOverviewSectionData;
}) {
  const isSplitIntro = section.layout === "split-intro";
  const isServiceIntro = section.layout === "service-intro";
  const isEditorial = section.layout === "editorial";
  const imageOnLeft = section.imagePosition === "left";

  return (
    <Section
      background={section.background ?? "surface"}
      spacing="default"
    >
      <Container size="wide">
        {isSplitIntro ? (
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:gap-12">
            <SplitIntroLeftColumn section={section} />
            <SplitIntroFeatureCards section={section} />
          </div>
        ) : isServiceIntro ? (
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            {imageOnLeft ? <EditorialSideImage sideImage={section.sideImage} /> : null}
            <ServiceIntroOverviewContent section={section} />
            {imageOnLeft ? null : <EditorialSideImage sideImage={section.sideImage} />}
          </div>
        ) : isEditorial ? (
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
            {imageOnLeft ? <EditorialSideImage sideImage={section.sideImage} /> : null}
            <EditorialOverviewContent section={section} />
            {imageOnLeft ? null : <EditorialSideImage sideImage={section.sideImage} />}
          </div>
        ) : (
          <div className="grid items-center gap-3xl lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-4xl">
            <DefaultOverviewContent section={section} />
            <DefaultSideImage sideImage={section.sideImage} />
          </div>
        )}
      </Container>
    </Section>
  );
}
