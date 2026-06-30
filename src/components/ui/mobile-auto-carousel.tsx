"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const DEFAULT_AUTO_INTERVAL_MS = 4500;

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

export type MobileAutoCarouselProps<T> = {
  items: readonly T[];
  renderSlide: (item: T, index: number) => ReactNode;
  getItemKey: (item: T, index: number) => string;
  ariaLabel: string;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
  controlsClassName?: string;
  prevLabel?: string;
  nextLabel?: string;
  dotLabel?: (item: T, index: number) => string;
  showArrows?: boolean;
  showDots?: boolean;
  autoIntervalMs?: number;
  pauseOnInteraction?: boolean;
  transitionClassName?: string;
};

export function MobileAutoCarousel<T>({
  items,
  renderSlide,
  getItemKey,
  ariaLabel,
  className,
  trackClassName,
  slideClassName,
  controlsClassName,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
  dotLabel,
  showArrows = true,
  showDots = true,
  autoIntervalMs = DEFAULT_AUTO_INTERVAL_MS,
  pauseOnInteraction = true,
  transitionClassName = "transition-transform duration-500 ease-out motion-reduce:transition-none",
}: MobileAutoCarouselProps<T>) {
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
    if (isPaused || items.length <= 1) {
      return;
    }

    const timer = window.setInterval(goNext, autoIntervalMs);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, items.length, autoIntervalMs]);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  if (items.length === 0) {
    return null;
  }

  const interactionHandlers = pauseOnInteraction
    ? {
        onMouseEnter: pause,
        onMouseLeave: resume,
        onFocus: pause,
        onBlur: resume,
        onTouchStart: pause,
        onTouchEnd: resume,
        onTouchCancel: resume,
      }
    : {};

  return (
    <div className={cn(className)} {...interactionHandlers}>
      <div
        className={cn("relative w-full", trackClassName)}
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        <div className="w-full overflow-hidden">
          <ul
            className={cn("flex w-full", reduceMotion ? "" : transitionClassName)}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <li
                key={getItemKey(item, index)}
                className={cn(
                  "min-w-full shrink-0 grow-0 basis-full px-0.5",
                  slideClassName,
                )}
                aria-hidden={index !== activeIndex}
              >
                {renderSlide(item, index)}
              </li>
            ))}
          </ul>
        </div>

        {items.length > 1 && (showArrows || showDots) ? (
          <div
            className={cn(
              "mt-lg flex items-center justify-center gap-md",
              controlsClassName,
            )}
          >
            {showArrows ? (
              <button
                type="button"
                onClick={goPrev}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200",
                  "bg-white text-primary shadow-sm",
                  "transition-colors duration-300 hover:border-primary hover:bg-primary/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
                aria-label={prevLabel}
              >
                <ChevronIcon direction="left" />
              </button>
            ) : null}

            {showDots ? (
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label={`${ariaLabel} slides`}
              >
                {items.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={getItemKey(item, index)}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={dotLabel?.(item, index) ?? `Go to slide ${index + 1}`}
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
            ) : null}

            {showArrows ? (
              <button
                type="button"
                onClick={goNext}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200",
                  "bg-white text-primary shadow-sm",
                  "transition-colors duration-300 hover:border-primary hover:bg-primary/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
                aria-label={nextLabel}
              >
                <ChevronIcon direction="right" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
