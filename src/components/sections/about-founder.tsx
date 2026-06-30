import Link from "next/link";
import Image from "next/image";
import { aboutFounderSection, type BioSegment } from "@/data/about-founder";
import { Container, Section, SectionHeader } from "@/components/ui";

function FounderBio({ segments }: { segments: readonly BioSegment[] }) {
  return (
    <p className="text-body-loose mt-xl w-full text-pretty text-slate-600">
      {segments.map((segment, index) => {
        if (segment.type === "link") {
          return (
            <Link
              key={`${segment.label}-${index}`}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 transition-colors duration-normal hover:text-primary-dark hover:underline"
            >
              {segment.label}
            </Link>
          );
        }

        return <span key={index}>{segment.value}</span>;
      })}
    </p>
  );
}

export function AboutFounder() {
  const { image } = aboutFounderSection;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <div className="flex flex-col gap-3xl lg:flex-row lg:items-start lg:gap-4xl">
          <div className="founder-portrait w-full shrink-0 lg:w-[42%]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="mx-auto h-auto w-full object-contain lg:mx-0"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </div>

          <div className="about-copy w-full lg:w-[58%] lg:pt-xs">
            <SectionHeader
              align="left"
              eyebrow={aboutFounderSection.badge}
              title={aboutFounderSection.title}
            />

            <p className="mt-md w-full text-pretty text-body text-slate-600">
              {aboutFounderSection.founded}
            </p>

            <FounderBio segments={aboutFounderSection.bio} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
