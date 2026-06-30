"use client";

import Image from "next/image";
import { journeySection, type JourneyStage } from "@/data/journey";
import { MobileAutoCarousel } from "@/components/ui/mobile-auto-carousel";

function JourneyStageCopy({ stage }: { stage: JourneyStage }) {
  return (
    <div className="px-2 text-center">
      <p className="text-small leading-snug">
        <span className="font-semibold text-primary">{stage.step}</span>{" "}
        <span className="font-semibold text-navy">{stage.label}</span>
      </p>
      <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600">
        {stage.description}
      </p>
    </div>
  );
}

function JourneyStageIcon({ stage }: { stage: JourneyStage }) {
  return (
    <div className="relative mx-auto h-24 w-full max-w-[8rem]">
      <Image
        src={stage.icon.src}
        alt={stage.icon.alt}
        fill
        className="object-contain object-bottom"
        sizes="8rem"
      />
    </div>
  );
}

function JourneyMobileStage({ stage }: { stage: JourneyStage }) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white px-md py-lg shadow-sm">
      <JourneyStageIcon stage={stage} />
      <div className="mt-4">
        <span
          aria-hidden="true"
          className="mx-auto block h-2 w-2 rounded-full bg-primary ring-4 ring-surface"
        />
      </div>
      <div className="mt-4 w-full">
        <JourneyStageCopy stage={stage} />
      </div>
    </article>
  );
}

export function JourneyMobileCarousel() {
  return (
    <MobileAutoCarousel
      className="lg:hidden"
      trackClassName="mx-auto max-w-[20rem]"
      items={journeySection.stages}
      getItemKey={(stage) => stage.step}
      ariaLabel="Patient journey steps"
      showArrows={false}
      showDots={false}
      autoIntervalMs={3000}
      renderSlide={(stage) => <JourneyMobileStage stage={stage} />}
    />
  );
}
