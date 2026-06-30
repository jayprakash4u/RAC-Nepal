"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container, Section, SectionHeader } from "@/components/ui";
import {
  testimonials,
  testimonialsSection,
  type Testimonial,
} from "@/data/testimonials";
import { cn } from "@/lib/cn";

const DESKTOP_CARDS_VISIBLE = 3;
const AUTO_INTERVAL_MS = 4500;

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
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

function TestimonialAvatar({
  testimonial,
  imageClassName,
}: {
  testimonial: Testimonial;
  imageClassName?: string;
}) {
  if (testimonial.image?.src) {
    return (
      <Image
        src={testimonial.image.src}
        alt={testimonial.image.alt}
        fill
        className={cn("object-cover object-center", imageClassName)}
        sizes="96px"
      />
    );
  }

  return (
    <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary-dark to-navy text-body font-bold text-white">
      {testimonial.initials}
    </span>
  );
}

function TestimonialMobileItem({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex h-full flex-col">
      <div
        className={cn(
          "flex h-full flex-col items-center rounded-2xl",
          "border border-slate-200 border-t-4 border-t-primary bg-white",
          "px-md pb-xl pt-md text-center shadow-lg",
        )}
      >
        <div
          className={cn(
            "shrink-0 rounded-2xl border border-slate-200 border-t-4 border-t-primary bg-white p-0.5 shadow-md",
          )}
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-slate-50">
            <TestimonialAvatar
              testimonial={testimonial}
              imageClassName="object-contain"
            />
          </div>
        </div>

        <header className="mt-md w-full shrink-0">
          <h3 className="text-body font-bold text-navy">{testimonial.name}</h3>
          <p className="mt-xs text-small leading-snug text-slate-600">
            {testimonial.role}
          </p>
        </header>

        <blockquote className="mt-md flex flex-1 items-start justify-center">
          <p className="text-small leading-relaxed text-slate-600">
            {testimonial.quote}
          </p>
        </blockquote>
      </div>
    </article>
  );
}

function TestimonialItem({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="relative flex h-full min-h-[21rem] flex-col">
      <div
        className={cn(
          "relative flex h-full min-h-[17rem] flex-col items-center rounded-2xl",
          "border border-slate-200 border-t-4 border-t-primary bg-white",
          "px-md pb-xl pt-14 text-center shadow-lg",
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-slate-200 border-t-4 border-t-primary bg-white p-0.5 shadow-md",
          )}
        >
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
            <TestimonialAvatar testimonial={testimonial} />
          </div>
        </div>

        <header className="w-full shrink-0">
          <h3 className="text-body font-bold text-navy">{testimonial.name}</h3>
          <p className="mt-xs text-small leading-snug text-slate-600">
            {testimonial.role}
          </p>
        </header>

        <blockquote className="mt-md flex flex-1 items-start justify-center">
          <p className="text-small leading-relaxed text-slate-600">
            {testimonial.quote}
          </p>
        </blockquote>
      </div>
    </article>
  );
}

function CarouselControls({
  pageCount,
  activePage,
  onPrev,
  onNext,
  onSelect,
  prevLabel = "Previous testimonials",
  nextLabel = "Next testimonials",
  dotLabel = (index: number) => `Go to testimonial group ${index + 1}`,
}: {
  pageCount: number;
  activePage: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  dotLabel?: (index: number) => string;
}) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="mt-xl flex items-center justify-center gap-lg">
      <button
        type="button"
        onClick={onPrev}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200",
          "bg-white text-primary shadow-sm",
          "transition-colors duration-normal hover:border-primary hover:bg-primary/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        )}
        aria-label={prevLabel}
      >
        <ChevronIcon direction="left" />
      </button>

      <div className="flex items-center gap-sm">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={dotLabel(index)}
            aria-current={index === activePage ? "true" : undefined}
            className={cn(
              "rounded-full transition-all duration-normal",
              index === activePage
                ? "h-2.5 w-2.5 bg-primary"
                : "h-2 w-2 bg-slate-300 hover:bg-slate-400",
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200",
          "bg-white text-primary shadow-sm",
          "transition-colors duration-normal hover:border-primary hover:bg-primary/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        )}
        aria-label={nextLabel}
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}

function TestimonialsMobileCarousel() {
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
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion || testimonials.length <= 1) {
      return;
    }

    const timer = window.setInterval(goNext, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, reduceMotion]);

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
        className="relative mx-auto w-full max-w-[24rem]"
        aria-roledescription="carousel"
        aria-label="Patient testimonials"
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
            {testimonials.map((testimonial, index) => (
              <li
                key={testimonial.id}
                className="w-full shrink-0 px-0.5"
                aria-hidden={index !== activeIndex}
              >
                <TestimonialMobileItem testimonial={testimonial} />
              </li>
            ))}
          </ul>
        </div>

        <CarouselControls
          pageCount={testimonials.length}
          activePage={activeIndex}
          onPrev={goPrev}
          onNext={goNext}
          onSelect={setActiveIndex}
          prevLabel="Previous testimonial"
          nextLabel="Next testimonial"
          dotLabel={(index) => `Go to testimonial ${index + 1}`}
        />
      </div>
    </div>
  );
}

function TestimonialsDesktopCarousel() {
  const [page, setPage] = useState(0);

  const pageCount = Math.max(
    1,
    testimonials.length - DESKTOP_CARDS_VISIBLE + 1,
  );
  const activePage = Math.min(page, pageCount - 1);
  const visibleTestimonials = testimonials.slice(
    activePage,
    activePage + DESKTOP_CARDS_VISIBLE,
  );

  const goPrev = useCallback(() => {
    setPage((current) => (current > 0 ? current - 1 : pageCount - 1));
  }, [pageCount]);

  const goNext = useCallback(() => {
    setPage((current) => (current < pageCount - 1 ? current + 1 : 0));
  }, [pageCount]);

  return (
    <div className="section-content hidden sm:block">
      <div className="mx-auto w-full max-w-[58rem]">
        <div
          key={activePage}
          className="grid grid-cols-3 items-stretch gap-md lg:gap-lg"
        >
          {visibleTestimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <CarouselControls
          pageCount={pageCount}
          activePage={activePage}
          onPrev={goPrev}
          onNext={goNext}
          onSelect={setPage}
        />
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <Section background="default" spacing="default" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full bg-primary/10 blur-2xl"
      />

      <Container size="wide" className="relative">
        <SectionHeader
          eyebrow={testimonialsSection.eyebrow}
          title={testimonialsSection.title}
          align="center"
          className="mx-auto max-w-[40rem]"
        />

        <TestimonialsMobileCarousel />
        <TestimonialsDesktopCarousel />
      </Container>
    </Section>
  );
}
