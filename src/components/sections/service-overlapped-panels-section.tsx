"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Container, Section, SectionHeader } from "@/components/ui";
import type {
  ServicePanelSectionData,
  ServiceTreatmentSectionData,
} from "@/types/service-content";
import { cn } from "@/lib/cn";

type TabId = "symptoms" | "causes" | "treatment";

const tabs: { id: TabId; label: string }[] = [
  { id: "symptoms", label: "Symptoms" },
  { id: "causes", label: "Causes" },
  { id: "treatment", label: "Treatment" },
];

function ListBullet({ item }: { item: string }) {
  return (
    <li className="flex items-start gap-md">
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          "bg-white/15 text-white",
        )}
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
      <span className="text-body leading-relaxed text-white/95">{item}</span>
    </li>
  );
}

function PanelImage({
  image,
  imageBackground,
  imageFit,
}: {
  image: { src: string; alt: string };
  imageBackground: string;
  imageFit: string;
}) {
  return (
    <div className="flex h-full min-h-[14rem] items-center justify-center bg-linear-to-br from-slate-50 to-white p-lg sm:min-h-[20rem] sm:p-2xl lg:p-3xl">
      <div
        className={cn(
          "relative w-full max-w-[16rem] overflow-hidden rounded-2xl",
          "border border-slate-200 border-t-4 border-t-primary bg-white shadow-md sm:max-w-[18rem]",
        )}
      >
        <div className={cn("relative aspect-[4/5] w-full", imageBackground)}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            unoptimized
            className={imageFit}
            sizes="(max-width: 1024px) 70vw, 18rem"
          />
        </div>
      </div>
    </div>
  );
}

function PanelContent({
  headingPrefix,
  title,
  items,
  footer,
}: {
  headingPrefix: string;
  title: string;
  items: readonly string[];
  footer?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col justify-center bg-primary-dark px-lg py-xl sm:px-2xl sm:py-3xl lg:px-3xl">
      <h3 className="font-display text-[1.375rem] leading-tight text-white sm:text-[1.75rem] lg:text-[2rem]">
        <span className="font-normal">{headingPrefix} </span>
        <span className="font-bold">{title}</span>
      </h3>

      <span
        aria-hidden="true"
        className="mt-xl mb-xl block h-px w-full max-w-[16rem] bg-white/30"
      />

      <ul className="flex flex-col gap-md">
        {items.map((item) => (
          <ListBullet key={item} item={item} />
        ))}
      </ul>

      {footer}
    </div>
  );
}

export function ServiceOverlappedPanelsSection({
  symptoms,
  causes,
  treatment,
}: {
  symptoms: ServicePanelSectionData;
  causes: ServicePanelSectionData;
  treatment: ServiceTreatmentSectionData;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("symptoms");
  const exercisesLabel = treatment.exercisesLabel ?? "Exercises:";

  const tabPanels: Record<
    TabId,
    {
      headingPrefix: string;
      title: string;
      image: { src: string; alt: string };
      imageBackground: string;
      imageFit: string;
      items: readonly string[];
      footer?: ReactNode;
    }
  > = {
    symptoms: {
      headingPrefix: "Symptoms of",
      title: symptoms.title,
      image: symptoms.image,
      imageBackground: "bg-black",
      imageFit: "object-contain object-center p-md",
      items: symptoms.items,
    },
    causes: {
      headingPrefix: "Causes of",
      title: causes.title,
      image: causes.image,
      imageBackground: "bg-white",
      imageFit: "object-cover object-center",
      items: causes.items,
    },
    treatment: {
      headingPrefix: "Treatment for",
      title: treatment.title,
      image: treatment.image,
      imageBackground: "bg-white",
      imageFit: "object-contain object-center p-md",
      items: treatment.modalities,
      footer: (
        <div className="mt-2xl border-t border-white/15 pt-2xl">
          <p className="text-body font-semibold text-white">{exercisesLabel}</p>
          <div className="mt-lg grid grid-cols-1 gap-x-2xl gap-y-md sm:grid-cols-2">
            <ul className="flex flex-col gap-md">
              {treatment.exercises.left.map((item) => (
                <ListBullet key={item} item={item} />
              ))}
            </ul>
            <ul className="flex flex-col gap-md">
              {treatment.exercises.right.map((item) => (
                <ListBullet key={item} item={item} />
              ))}
            </ul>
          </div>
        </div>
      ),
    },
  };

  const panel = tabPanels[activeTab];

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <SectionHeader
          eyebrow="Patient Education"
          title={{ prefix: "Understanding", highlight: "Arthritis" }}
          align="center"
          className="mx-auto"
        />

        <div
          className={cn(
            "mt-3xl overflow-hidden rounded-2xl border border-slate-200",
            "bg-white shadow-lg",
          )}
        >
          <div
            role="tablist"
            aria-label="Arthritis education topics"
            className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/80"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`arthritis-panel-${tab.id}`}
                  id={`arthritis-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative min-w-0 px-2 py-3 text-[0.8125rem] font-medium transition-colors duration-normal sm:px-md sm:py-lg sm:text-body",
                    isActive
                      ? "bg-white text-primary"
                      : "text-slate-600 hover:bg-white/60 hover:text-navy",
                  )}
                >
                  {tab.label}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`arthritis-panel-${activeTab}`}
            aria-labelledby={`arthritis-tab-${activeTab}`}
            className="grid grid-cols-1 lg:grid-cols-2"
          >
            <PanelImage
              image={panel.image}
              imageBackground={panel.imageBackground}
              imageFit={panel.imageFit}
            />
            <PanelContent
              headingPrefix={panel.headingPrefix}
              title={panel.title}
              items={panel.items}
              footer={panel.footer}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
