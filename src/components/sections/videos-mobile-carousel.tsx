"use client";

import { useCallback, useEffect, useState } from "react";
import type { VideoItem } from "@/data/videos";
import { VideoMobileCard } from "@/components/sections/video-mobile-card";
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

export function VideosMobileCarousel({
  items,
}: {
  items: readonly VideoItem[];
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
        className="relative w-full"
        aria-roledescription="carousel"
        aria-label="Health education and patient stories"
      >
        <div className="overflow-hidden">
          <ul
            className={cn(
              "flex",
              reduceMotion
                ? ""
                : "transition-transform duration-500 ease-out motion-reduce:transition-none",
            )}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((video, index) => (
              <li
                key={video.id}
                className="w-full shrink-0 px-0.5"
                aria-hidden={index !== activeIndex}
              >
                <VideoMobileCard video={video} />
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
              aria-label="Previous video"
            >
              <ChevronIcon direction="left" />
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Video slides"
            >
              {items.map((video, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={video.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to ${video.title}`}
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
              aria-label="Next video"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
