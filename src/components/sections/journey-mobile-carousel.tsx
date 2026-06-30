"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { journeySection, type JourneyStage } from "@/data/journey";
import { cn } from "@/lib/cn";

const AUTO_INTERVAL_MS = 1200;

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
  const items = journeySection.stages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = window.setInterval(goNext, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, items.length]);

  return (
    <div className="lg:hidden">
      <div
        className="relative mx-auto w-full max-w-[20rem]"
        aria-roledescription="carousel"
        aria-label="Patient journey steps"
        aria-live="polite"
      >
        <div className="w-full overflow-hidden">
          <ul
            className={cn(
              "flex w-full",
              reduceMotion
                ? ""
                : "transition-transform duration-300 ease-linear motion-reduce:transition-none",
            )}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((stage, index) => (
              <li
                key={stage.step}
                className="min-w-full shrink-0 grow-0 basis-full"
                aria-hidden={index !== activeIndex}
              >
                <JourneyMobileStage stage={stage} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
