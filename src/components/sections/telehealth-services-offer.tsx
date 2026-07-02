"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import {
  ServiceCardHoverOverlay,
  serviceIconCardElevatedClasses,
  serviceIconImageElevatedClasses,
  serviceIconRingElevatedClasses,
  serviceIconRingClasses,
} from "@/components/sections/service-icon-card";
import { Button, Container, Section } from "@/components/ui";
import { resolveSectionTitle } from "@/types/section-title";
import { telehealthPage } from "@/data/telehealth-page";
import { cn } from "@/lib/cn";

type ServiceOfferItem = (typeof telehealthPage.servicesOffer.items)[number];
type ServiceOfferIcon = ServiceOfferItem["icon"];

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M10 16.5s-5.5-3.6-5.5-7.2C4.5 7.2 6.4 5.5 8.4 5.5c1.1 0 2.1.5 2.6 1.3.5-.8 1.5-1.3 2.6-1.3 2 0 3.9 1.7 3.9 3.8C17.5 12.9 10 16.5 10 16.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M6 2v2M14 2v2M3.5 7h13M5 4h10a1.5 1.5 0 011.5 1.5v11A1.5 1.5 0 0115 18.5H5A1.5 1.5 0 013.5 17V5.5A1.5 1.5 0 015 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArthritisIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M8.5 8.5c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.5 12.5v7M9 17.5h7M7.5 20.5h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FollowUpIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14.5h2.5M9 17.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MedicationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M9.5 5.5h5a2 2 0 012 2v11a2 2 0 01-2 2h-5a2 2 0 01-2-2v-11a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9.5 9.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="6" y="8" width="3" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LabIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M10 4h4l4.5 9.5a4.5 4.5 0 01-4 6.5H9.5a4.5 4.5 0 01-4-6.5L10 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 9h4M9.5 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PainIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 19.5c.75-3 2.75-5 5.5-5s4.75 2 5.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 10.5v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const serviceOfferIcons: Record<ServiceOfferIcon, () => ReactElement> = {
  arthritis: ArthritisIcon,
  followUp: FollowUpIcon,
  medication: MedicationIcon,
  lab: LabIcon,
  pain: PainIcon,
};

function TelehealthServiceOfferCard({
  item,
  elevated = false,
}: {
  item: ServiceOfferItem;
  elevated?: boolean;
}) {
  const Icon = serviceOfferIcons[item.icon];

  return (
    <article
      className={cn(
        "group relative flex h-full w-full flex-col rounded-2xl border border-transparent bg-white text-center shadow-sm",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1.5 hover:border-primary/15",
        "hover:shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_38%,transparent)]",
        elevated && serviceIconCardElevatedClasses,
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <ServiceCardHoverOverlay active={elevated} />

      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-slate-100">
          <Image
            src={encodeURI(item.image.src)}
            alt={item.image.alt}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1280px) 30vw, 18vw"
            className={cn(
              "object-cover object-center transition-transform duration-500",
              elevated
                ? "scale-105 motion-reduce:scale-100"
                : "group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            )}
          />
        </div>

        <span
          className={cn(
            serviceIconRingClasses,
            "absolute bottom-0 left-1/2 z-10 h-12 w-12 -translate-x-1/2 translate-y-1/2 p-2",
            elevated && serviceIconRingElevatedClasses,
          )}
        >
          <span
            className={cn(
              "service-icon-bounce flex h-full w-full items-center justify-center",
              elevated
                ? serviceIconImageElevatedClasses
                : "transition-transform duration-300 group-hover:scale-105",
            )}
          >
            <Icon />
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center px-4 pb-5 pt-8 sm:px-5 sm:pb-6 sm:pt-9">
        <h3
          className={cn(
            "text-[0.9375rem] font-semibold leading-snug transition-colors duration-300 sm:text-body",
            elevated ? "text-primary" : "text-navy group-hover:text-primary",
          )}
        >
          {item.title}
        </h3>

        <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
          {item.description}
        </p>

        <span
          aria-hidden="true"
          className={cn(
            "mt-md block h-0.5 rounded-full bg-primary transition-all duration-300",
            elevated ? "w-10" : "w-8 group-hover:w-10",
          )}
        />
      </div>
    </article>
  );
}

function ServicesOfferBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-primary-soft/40 blur-3xl" />
      <div
        className="absolute -bottom-16 -left-10 h-56 w-56 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 18%, transparent) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div
        className="absolute -right-8 bottom-0 h-48 w-48 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 18%, transparent) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />
    </div>
  );
}

export function TelehealthServicesOffer() {
  const { servicesOffer } = telehealthPage;
  const { prefix, highlight } = resolveSectionTitle(servicesOffer.title);

  return (
    <Section
      background="surface"
      spacing="default"
      className="relative overflow-hidden"
      aria-label={servicesOffer.title}
    >
      <ServicesOfferBackground />

      <Container size="wide" className="relative">
        <header className="section-intro mx-auto flex max-w-[44rem] flex-col items-center text-center motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
            <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
              {servicesOffer.eyebrow}
            </p>
            <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
            <span className="text-primary">
              <HeartIcon />
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
          </div>

          <h2 className="font-display mt-sm w-full text-h2 font-semibold leading-[1.15] tracking-tight text-pretty text-navy lg:text-[2.5rem]">
            {prefix ? <span>{prefix} </span> : null}
            <span className="text-primary">{highlight}</span>
          </h2>

          <span
            aria-hidden="true"
            className="mt-sm block h-1 w-14 rounded-full bg-primary"
          />

          <p className="text-body mt-md text-pretty text-slate-600">
            {servicesOffer.description}
          </p>
        </header>

        <ResponsiveItemCarousel
          items={servicesOffer.items}
          ariaLabel="Telehealth services we offer"
          getItemKey={(item) => item.title}
          desktopGridClassName="section-content mt-3xl grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5"
          mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
          carouselTrackClassName="mx-auto max-w-[18rem]"
          listItemClassName="flex"
          staggerDesktopItems
          renderItem={(item, { elevated }) => (
            <TelehealthServiceOfferCard item={item} elevated={elevated} />
          )}
        />

        <div className="section-content mt-3xl flex justify-center motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none [animation-delay:350ms]">
          <Button
            href={servicesOffer.cta.href}
            variant="outline"
            size="lg"
            className="min-w-[16rem] rounded-xl transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <CalendarIcon />
            {servicesOffer.cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
