import Image from "next/image";
import Link from "next/link";
import { ServiceAdvancedDiagnosticSection } from "@/components/sections/service-advanced-diagnostic-section";
import { ServiceCommonSymptomsSection } from "@/components/sections/service-common-symptoms-section";
import { ServiceOverviewSection } from "@/components/sections/service-overview-section";
import { ServiceConditionsWeTreatSection } from "@/components/sections/service-conditions-we-treat-section";
import { ServiceRehabilitationProgramsSection } from "@/components/sections/service-rehabilitation-programs-section";
import { ServiceStepByStepSection } from "@/components/sections/service-step-by-step-section";
import { ServiceBenefitsSection } from "@/components/sections/service-benefits-section";
import { ServiceIntroHeroSection } from "@/components/sections/service-intro-hero-section";
import { ServiceHomeCareTeamSection } from "@/components/sections/service-home-care-team-section";
import { ServiceCausesRiskSection } from "@/components/sections/service-causes-risk-section";
import { ServiceDietLifestyleSection } from "@/components/sections/service-diet-lifestyle-section";
import { ServicePhotoSymptomsSection } from "@/components/sections/service-photo-symptoms-section";
import { ServicePreventionTipsSection } from "@/components/sections/service-prevention-tips-section";
import { ServiceInfographicSection } from "@/components/sections/service-infographic-section";
import { ServiceInjectionTypesSection } from "@/components/sections/service-injection-types-section";
import { ServiceServicesWeProvideSection } from "@/components/sections/service-services-we-provide-section";
import { ServiceSupportCtaSection } from "@/components/sections/service-support-cta-section";
import { ServiceTreatmentSolutionsSection } from "@/components/sections/service-treatment-solutions-section";
import { ServiceSymptomsWeTreatSection } from "@/components/sections/service-symptoms-we-treat-section";
import { ServiceIntroductionSection } from "@/components/sections/service-introduction-section";
import { ServiceDiagnosticServicesSection } from "@/components/sections/service-diagnostic-services-section";
import { ServiceSymptomsEvaluationSection } from "@/components/sections/service-symptoms-evaluation-section";
import { ServiceConditionsAssessedSection } from "@/components/sections/service-conditions-assessed-section";
import { ServiceTypesSection } from "@/components/sections/service-types-section";
import { ServiceOverlappedPanelsSection } from "@/components/sections/service-overlapped-panels-section";
import { ServiceTreatmentSection } from "@/components/sections/service-treatment-section";
import { ServiceStagesSection } from "@/components/sections/service-stages-section";
import { ServiceCausesSection } from "@/components/sections/service-causes-section";
import { ServiceSymptomsSection } from "@/components/sections/service-symptoms-section";
import { Button, Container, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import type { ServicePageData, ServiceTextSegment } from "@/types/service-content";
import { cn } from "@/lib/cn";

function ServiceDescription({
  paragraphs,
}: {
  paragraphs: readonly (readonly ServiceTextSegment[])[];
}) {
  return (
    <p className="text-body text-pretty leading-[1.85] text-slate-600">
      {paragraphs.map((paragraph, paragraphIndex) => (
        <span key={paragraphIndex}>
          {paragraph.map((segment, index) =>
            segment.type === "strong" ? (
              <strong
                key={index}
                className="font-semibold text-primary-dark"
              >
                {segment.value}
              </strong>
            ) : (
              <span key={index}>{segment.value}</span>
            ),
          )}
          {paragraphIndex < paragraphs.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}

export function ServiceHero({ service }: { service: ServicePageData }) {
  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <div className="flex flex-col gap-xl sm:gap-3xl lg:flex-row lg:items-start lg:gap-4xl">
          <div className="flex w-full shrink-0 justify-center lg:w-[38%] lg:justify-start">
            <div
              className={cn(
                "relative w-full max-w-[20rem] overflow-hidden sm:max-w-[22rem]",
                "aspect-square rounded-2xl border border-slate-200 border-t-4 border-t-primary",
                "bg-surface shadow-lg sm:max-w-[26rem]",
              )}
            >
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                className="object-contain p-md sm:p-lg"
                sizes="(max-width: 1024px) 90vw, 26rem"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-[62%] lg:pt-md">
            <p className="font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-primary uppercase sm:text-eyebrow sm:tracking-[0.18em]">
              Our Services
            </p>
            <h1 className="font-display mt-sm text-[1.875rem] leading-[1.12] font-semibold text-navy sm:text-[3rem] lg:text-[3.25rem]">
              {service.title}
            </h1>

            <div className="mt-lg sm:mt-2xl">
              <ServiceDescription paragraphs={service.paragraphs} />
            </div>

            <ServiceHeroCta />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ServiceHeroCta() {
  return (
    <div className="mt-xl border-t border-slate-200 pt-lg">
      <div className="flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">
        <p className="text-body max-w-[36rem] text-pretty text-slate-600">
          Get specialist rheumatology care tailored to your needs at{" "}
          <span className="font-semibold text-navy">{siteConfig.shortName}</span>
          .
        </p>
        <div className="flex shrink-0 flex-col gap-sm sm:flex-row sm:flex-wrap sm:gap-md">
          <Button
            href={siteConfig.links.appointment}
            size="lg"
            className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
          >
            Book a Consultation
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ServiceDetailSection({
  image,
  eyebrow = "How It Works",
  title = "Your Care Journey",
}: {
  image: NonNullable<ServicePageData["detailImage"]>;
  eyebrow?: string;
  title?: string;
}) {
  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto mb-2xl max-w-[40rem] text-center">
          <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-sm font-display text-h2 font-semibold text-navy">
            {title}
          </h2>
        </header>

        <div
          className={cn(
            "mx-auto w-full max-w-[56rem] overflow-hidden rounded-2xl",
            "border border-slate-200 border-t-4 border-t-primary bg-white",
            "p-sm shadow-lg sm:p-md",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={675}
            className="h-auto w-full object-contain"
            sizes="(max-width: 1024px) 100vw, 56rem"
          />
        </div>
      </Container>
    </Section>
  );
}

/** @deprecated Use ServiceHero inside ServicePage instead. */
export function ServiceContent({ service }: { service: ServicePageData }) {
  return <ServicePage service={service} />;
}

function hasOverlappedPanels(service: ServicePageData) {
  return Boolean(
    service.symptomsSection &&
      service.causesSection &&
      service.treatmentSection,
  );
}

export function ServicePage({ service }: { service: ServicePageData }) {
  const showOverlappedPanels = hasOverlappedPanels(service);

  return (
    <>
      {service.introHeroSection ? (
        <ServiceIntroHeroSection section={service.introHeroSection} />
      ) : service.overviewSection ? (
        <ServiceOverviewSection section={service.overviewSection} />
      ) : (
        <ServiceHero service={service} />
      )}

      {service.servicesWeProvideSection ? (
        <ServiceServicesWeProvideSection
          section={service.servicesWeProvideSection}
        />
      ) : null}

      {service.injectionTypesSection ? (
        <ServiceInjectionTypesSection section={service.injectionTypesSection} />
      ) : null}

      {service.supportCtaSection ? (
        <ServiceSupportCtaSection section={service.supportCtaSection} />
      ) : null}

      {service.symptomsGridSection ? (
        <ServiceConditionsWeTreatSection section={service.symptomsGridSection} />
      ) : null}

      {service.photoSymptomsSection ? (
        <ServicePhotoSymptomsSection section={service.photoSymptomsSection} />
      ) : null}

      {service.causesRiskSection ? (
        <ServiceCausesRiskSection section={service.causesRiskSection} />
      ) : null}

      {service.dietLifestyleSection ? (
        <ServiceDietLifestyleSection section={service.dietLifestyleSection} />
      ) : null}

      {service.riskFactorsSection ? (
        <ServiceBenefitsSection section={service.riskFactorsSection} />
      ) : null}

      {service.benefitsInfographicSection ? (
        <ServiceInfographicSection section={service.benefitsInfographicSection} />
      ) : null}

      {service.preventionTipsSection ? (
        <ServicePreventionTipsSection section={service.preventionTipsSection} />
      ) : null}

      {service.conditionsWeTreatSection ? (
        <ServiceConditionsWeTreatSection
          section={service.conditionsWeTreatSection}
        />
      ) : null}

      {service.homeCareProgramsSection ? (
        <ServiceBenefitsSection section={service.homeCareProgramsSection} />
      ) : null}

      {service.homeCareTeamSection ? (
        <ServiceHomeCareTeamSection section={service.homeCareTeamSection} />
      ) : null}

      {service.commonSymptomsSection ? (
        <ServiceCommonSymptomsSection section={service.commonSymptomsSection} />
      ) : null}

      {service.advancedDiagnosticSection ? (
        <ServiceAdvancedDiagnosticSection
          section={service.advancedDiagnosticSection}
        />
      ) : null}

      {service.introductionSection ? (
        <ServiceIntroductionSection section={service.introductionSection} />
      ) : null}

      {service.symptomsWeTreatSection ? (
        <ServiceSymptomsWeTreatSection section={service.symptomsWeTreatSection} />
      ) : null}

      {service.treatmentSolutionsSection ? (
        <ServiceTreatmentSolutionsSection
          section={service.treatmentSolutionsSection}
        />
      ) : null}

      {service.rehabilitationProgramsSection ? (
        <ServiceRehabilitationProgramsSection
          section={service.rehabilitationProgramsSection}
        />
      ) : null}

      {service.stepByStepSection ? (
        <ServiceStepByStepSection section={service.stepByStepSection} />
      ) : null}

      {service.benefitsSection ? (
        <ServiceBenefitsSection section={service.benefitsSection} />
      ) : null}

      {service.detailImage ? (
        <ServiceDetailSection image={service.detailImage} />
      ) : null}

      {service.symptomsEvaluationSection ? (
        <ServiceSymptomsEvaluationSection
          section={service.symptomsEvaluationSection}
        />
      ) : null}

      {service.conditionsAssessedSection ? (
        <ServiceConditionsAssessedSection
          section={service.conditionsAssessedSection}
        />
      ) : null}

      {showOverlappedPanels ? (
        <ServiceOverlappedPanelsSection
          symptoms={service.symptomsSection!}
          causes={service.causesSection!}
          treatment={service.treatmentSection!}
        />
      ) : (
        <>
          {service.symptomsSection ? (
            <ServiceSymptomsSection section={service.symptomsSection} />
          ) : null}

          {service.causesSection ? (
            <ServiceCausesSection section={service.causesSection} />
          ) : null}

          {service.treatmentSection ? (
            <ServiceTreatmentSection section={service.treatmentSection} />
          ) : null}
        </>
      )}

      {service.typesSection ? (
        <ServiceTypesSection section={service.typesSection} />
      ) : null}

      {service.stagesSection ? (
        <ServiceStagesSection section={service.stagesSection} />
      ) : null}

      {service.diagnosticServicesSection ? (
        <ServiceDiagnosticServicesSection
          section={service.diagnosticServicesSection}
        />
      ) : null}
    </>
  );
}

export function ServiceBreadcrumb({ serviceTitle }: { serviceTitle: string }) {
  return (
    <Section
      background="surface"
      spacing="none"
      className="border-b border-slate-200"
    >
      <Container size="wide" className="py-md">
        <nav aria-label="Breadcrumb" className="text-small text-slate-600">
          <ol className="flex flex-wrap items-center gap-xs">
            <li>
              <Link
                href="/"
                className="transition-colors duration-normal hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span>Services</span>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="font-medium text-navy">{serviceTitle}</span>
            </li>
          </ol>
        </nav>
      </Container>
    </Section>
  );
}
