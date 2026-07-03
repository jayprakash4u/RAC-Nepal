"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { journeySection, type JourneyStage } from "@/data/journey";
import { cn } from "@/lib/cn";

const STAGGER_MS = 340;

function useInViewOnce<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function JourneyStageCopy({ stage }: { stage: JourneyStage }) {
  return (
    <div className="px-1 text-center">
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
    <div className="relative mx-auto h-20 w-full max-w-[6.5rem] sm:h-24 sm:max-w-[7.5rem] lg:h-28 lg:max-w-[8.5rem] xl:h-32 xl:max-w-[9.5rem]">
      <Image
        src={stage.icon.src}
        alt={stage.icon.alt}
        fill
        className="object-contain object-bottom"
        sizes="(max-width: 1024px) 28vw, 9.5rem"
      />
    </div>
  );
}

export function JourneyDesktop() {
  const { stages } = journeySection;
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="hidden lg:grid lg:grid-cols-6 lg:gap-x-3">
      {stages.map((stage, index) => (
        <div
          key={`${stage.step}-icon`}
          className={cn(
            "flex justify-center motion-reduce:opacity-100",
            inView
              ? "motion-safe:animate-[journeyReveal_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
              : "opacity-0",
          )}
          style={{ animationDelay: `${index * STAGGER_MS}ms` }}
        >
          <JourneyStageIcon stage={stage} />
        </div>
      ))}

      <div className="relative col-span-6 grid grid-cols-6 py-4 lg:py-5">
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-[8%] left-[8%] h-px -translate-y-1/2"
        >
          <div
            className={cn(
              "h-full w-full origin-left bg-primary/30 motion-reduce:scale-x-100",
              inView
                ? "motion-safe:animate-[journeyLineGrow_2.6s_cubic-bezier(0.33,1,0.68,1)_both]"
                : "scale-x-0",
            )}
          />
        </div>

        {stages.map((stage, index) => (
          <div key={`${stage.step}-dot`} className="flex justify-center">
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 h-2 w-2 rounded-full bg-primary ring-4 ring-surface motion-reduce:scale-100 motion-reduce:opacity-100",
                inView
                  ? "motion-safe:animate-[journeyDotPop_0.7s_cubic-bezier(0.34,1.3,0.64,1)_both]"
                  : "scale-0 opacity-0",
              )}
              style={{ animationDelay: `${index * STAGGER_MS + 220}ms` }}
            />
          </div>
        ))}
      </div>

      {stages.map((stage, index) => (
        <div
          key={`${stage.step}-copy`}
          className={cn(
            "motion-reduce:opacity-100",
            inView
              ? "motion-safe:animate-[journeyReveal_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
              : "opacity-0",
          )}
          style={{ animationDelay: `${index * STAGGER_MS + 140}ms` }}
        >
          <JourneyStageCopy stage={stage} />
        </div>
      ))}
    </div>
  );
}
