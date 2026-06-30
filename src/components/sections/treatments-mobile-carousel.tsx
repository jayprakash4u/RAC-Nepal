"use client";

import { useCallback, useEffect, useState } from "react";
import type { ConditionWeTreatItem } from "@/data/treatments";
import { ConditionWeTreatCard } from "@/components/sections/condition-we-treat-card";
import { cn } from "@/lib/cn";

const AUTO_INTERVAL_MS = 4500;

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d={direction === "left" ? "M12 5l-5 5 5 5" : "M8 5l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TreatmentsMobileCarousel({
  items,
}: {
  items: readonly ConditionWeTreatItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused || reduceMotion || items.length <= 1) {
      return;
    }

    const timer = window.setInterval(goNext, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, reduceMotion, items.length]);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  return (
    <div
      className="section-content sm:hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div
        className="relative mx-auto w-full max-w-[22rem] px-1 pt-2"
        aria-roledescription="carousel"
        aria-label="Conditions we treat"
      >
        <div className="overflow-hidden rounded-2xl">
          <ul
            className={cn(
              "flex",
              reduceMotion
                ? ""
                : "transition-transform duration-500 ease-out motion-reduce:transition-none",
            )}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <li
                key={item.id}
                className="w-full shrink-0"
                aria-hidden={index !== activeIndex}
              >
                <ConditionWeTreatCard
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  icon={item.icon}
                  elevated
                />
              </li>
            ))}
          </ul>
        </div>

        {items.length > 1 ? (
          <div className="mt-lg flex items-center justify-center gap-md">
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200",
                "bg-white text-primary shadow-sm",
                "transition-colors duration-300 hover:border-primary hover:bg-primary/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
              aria-label="Previous condition"
            >
              <ChevronIcon direction="left" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Condition slides">
              {items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to ${item.title}`}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      isActive
                        ? "w-6 bg-primary"
                        : "w-2 bg-slate-300 hover:bg-primary/50",
                    )}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200",
                "bg-white text-primary shadow-sm",
                "transition-colors duration-300 hover:border-primary hover:bg-primary/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
              aria-label="Next condition"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
