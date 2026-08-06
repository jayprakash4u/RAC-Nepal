import Image from "next/image";
import { Container, Section } from "@/components/ui";
import type { ServiceInfographicSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function MobileHighlightsList({
  items,
}: {
  items: readonly {
    title: string;
    description: string;
    icon: { src: string; alt: string };
  }[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:hidden">
      {items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm"
        >
          <span
            aria-hidden="true"
            className="service-icon-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-white shadow-sm"
          >
            <Image
              src={item.icon.src}
              alt={item.icon.alt}
              width={56}
              height={56}
              className="h-9 w-9"
            />
          </span>
          <h3 className="mt-2 text-[0.65rem] font-bold text-navy">
            {item.title}
          </h3>
          <p className="mt-1 text-[0.6rem] leading-snug text-slate-600">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

const RING_ITEMS = 8;
const RING_RADIUS_PERCENT = 38;

function RingItem({
  item,
  index,
  total,
}: {
  item: { title: string; description: string; icon: { src: string; alt: string } };
  index: number;
  total: number;
}) {
  const angle = (index * 360) / total - 90;
  const angleRad = (angle * Math.PI) / 180;
  const x = 50 + RING_RADIUS_PERCENT * Math.cos(angleRad);
  const y = 50 + RING_RADIUS_PERCENT * Math.sin(angleRad);

  const isTop = Math.abs(Math.sin(angleRad) + 1) < 0.15;
  const isBottom = Math.abs(Math.sin(angleRad) - 1) < 0.15;
  const isRightSide = !isTop && !isBottom && Math.cos(angleRad) > 0;
  const isLeftSide = !isTop && !isBottom && Math.cos(angleRad) <= 0;

  const textWidth = "w-28 sm:w-32";
  const textAlign = isLeftSide ? "text-right" : "text-left";

  return (
    <div
      className="group absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <div className="relative h-16 w-16 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          className="service-icon-ring absolute inset-0 flex items-center justify-center rounded-full border-2 border-primary/30 bg-white shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-primary group-hover:bg-primary-soft/25"
        >
          <span className="service-icon-bounce flex items-center justify-center">
            <Image
              src={item.icon.src}
              alt={item.icon.alt}
              width={56}
              height={56}
              className="h-9 w-9 sm:h-11 sm:w-11"
            />
          </span>
        </span>

        {isLeftSide && (
          <div
            className={`absolute right-full top-1/2 -translate-y-1/2 pr-4 ${textWidth} ${textAlign}`}
          >
            <h3 className="text-[0.65rem] font-bold text-navy sm:text-xs">
              {item.title}
            </h3>
            <p className="mt-1 text-[0.6rem] leading-snug text-slate-600 sm:text-xs">
              {item.description}
            </p>
          </div>
        )}

        {isRightSide && (
          <div
            className={`absolute left-full top-1/2 -translate-y-1/2 pl-4 ${textWidth} ${textAlign}`}
          >
            <h3 className="text-[0.65rem] font-bold text-navy sm:text-xs">
              {item.title}
            </h3>
            <p className="mt-1 text-[0.6rem] leading-snug text-slate-600 sm:text-xs">
              {item.description}
            </p>
          </div>
        )}

        {isTop && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${textWidth} text-center`}
          >
            <h3 className="text-[0.65rem] font-bold text-navy sm:text-xs">
              {item.title}
            </h3>
            <p className="mt-1 text-[0.6rem] leading-snug text-slate-600 sm:text-xs">
              {item.description}
            </p>
          </div>
        )}

        {isBottom && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-full pb-3 ${textWidth} text-center`}
          >
            <h3 className="text-[0.65rem] font-bold text-navy sm:text-xs">
              {item.title}
            </h3>
            <p className="mt-1 text-[0.6rem] leading-snug text-slate-600 sm:text-xs">
              {item.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ServiceInfographicSection({
  section,
}: {
  section: ServiceInfographicSectionData;
}) {
  const title = section.title ?? {
    prefix: "Benefits of",
    highlight: "Osteoporosis Care",
  };

  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <h2 className="font-display text-[1.5rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.375rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-14 rounded-full bg-primary"
          />
        </header>

        <div className="mt-2xl sm:mt-3xl">
          {section.items.length ? (
            <MobileHighlightsList items={section.items} />
          ) : null}

          <div
            className={cn(
              "hidden sm:flex sm:items-center sm:justify-center",
              section.centerImage && "sm:mt-2xl",
            )}
          >
            {section.centerImage ? (
              <div className="relative w-full max-w-[32rem] sm:max-w-[42rem]">
                <div className="relative w-full aspect-square">
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full text-slate-200"
                    viewBox="0 0 200 200"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="76"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="3 5"
                    />
                  </svg>

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image
                      src={section.centerImage.src}
                      alt={section.centerImage.alt}
                      width={320}
                      height={320}
                      className="h-28 w-auto object-contain sm:h-36 lg:h-44"
                      priority
                    />
                  </div>

                  {section.items.map((item, index) => (
                    <RingItem
                      key={index}
                      item={item}
                      index={index}
                      total={RING_ITEMS}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
