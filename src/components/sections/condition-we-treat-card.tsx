import Image from "next/image";
import Link from "next/link";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
  serviceIconRingClasses,
} from "@/components/sections/service-icon-card";
import { cn } from "@/lib/cn";

export function ConditionWeTreatCard({
  title,
  description,
  href,
  icon,
  className,
  elevated = false,
}: {
  title: string;
  description: string;
  href: string;
  icon: { src: string; alt: string };
  className?: string;
  elevated?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        serviceIconCardClasses,
        "h-full items-center px-md py-lg text-center sm:px-md sm:py-lg",
        elevated &&
          cn(
            "service-icon-card-active -translate-y-1.5 border-primary/15",
            "shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_38%,transparent)]",
          ),
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <ServiceCardHoverOverlay active={elevated} />

      <div
        className={cn(
          serviceIconRingClasses,
          "h-[4.75rem] w-[4.75rem] bg-primary-soft/35 p-2.5 sm:h-20 sm:w-20 sm:p-3",
          elevated &&
            "scale-110 border-primary bg-primary-soft/25 motion-reduce:scale-100",
        )}
      >
        <Image
          src={icon.src}
          alt={icon.alt}
          width={128}
          height={128}
          className={cn(
            "service-icon-bounce h-full w-full object-contain transition-transform duration-300",
            elevated
              ? "scale-105 motion-reduce:scale-100"
              : "group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          )}
          sizes="5rem"
          unoptimized
        />
      </div>

      <p
        className={cn(
          "mt-md text-[0.8125rem] font-semibold leading-snug tracking-normal transition-colors duration-300 sm:text-small",
          elevated ? "text-primary" : "text-navy group-hover:text-primary",
        )}
      >
        {title}
      </p>

      <p className="mt-1 max-w-[14rem] text-[0.75rem] leading-relaxed text-slate-600 sm:text-[0.8125rem]">
        {description}
      </p>

      <span
        aria-hidden="true"
        className={cn(
          "mt-md block h-0.5 rounded-full bg-primary transition-all duration-300",
          elevated ? "w-10" : "w-8 group-hover:w-10",
        )}
      />
    </Link>
  );
}
