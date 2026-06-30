import Image from "next/image";
import Link from "next/link";
import { Button, Container, Section, SectionHeader } from "@/components/ui";
import { ServicesMobileCarousel } from "@/components/sections/services-mobile-carousel";
import { servicesSection, type ServiceItem } from "@/data/services";
import { cn } from "@/lib/cn";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-3.5 w-3.5"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCardImage({ image }: { image: ServiceItem["image"] }) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-normal group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 20vw"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-slate-50"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-primary/70">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v11A2.5 2.5 0 0117.5 20h-11A2.5 2.5 0 014 17.5v-11z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </span>
    </div>
  );
}

function ServiceCard({ title, description, href, image }: ServiceItem) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden text-left",
        "rounded-lg border border-slate-200/80 bg-background",
        "transition-colors duration-normal",
        "hover:border-primary/30 hover:bg-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <div className="relative h-28 w-full overflow-hidden border-b border-slate-100 bg-slate-50 sm:h-24">
        <ServiceCardImage image={image} />
      </div>

      <div className="flex flex-1 flex-col p-md">
        <h3 className="line-clamp-2 text-small font-semibold leading-snug text-navy transition-colors duration-normal group-hover:text-primary">
          {title}
        </h3>

        <p className="mt-xs line-clamp-2 text-[0.8125rem] leading-relaxed text-slate-600">
          {description}
        </p>

        <span className="mt-sm inline-flex items-center gap-1 text-[0.8125rem] font-medium text-primary/80 transition-colors duration-normal group-hover:text-primary">
          Learn more
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  return (
    <Section background="surface" spacing="default">
      <Container size="wide">
        <SectionHeader
          eyebrow={servicesSection.eyebrow}
          title={servicesSection.title}
        />

        <ServicesMobileCarousel items={servicesSection.items} />

        <ul className="section-content hidden grid-cols-2 gap-md sm:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-lg">
          {servicesSection.items.map((service) => (
            <li key={service.id} className="flex">
              <ServiceCard {...service} />
            </li>
          ))}
        </ul>

        <div className="section-content flex justify-center">
          <Button
            href={servicesSection.cta.href}
            variant="outline"
            size="md"
          >
            {servicesSection.cta.label}
            <ArrowIcon />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
