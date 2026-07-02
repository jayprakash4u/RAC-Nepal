export type ServiceTextSegment =
  | { type: "text"; value: string }
  | { type: "strong"; value: string };

export type ServicePanelSectionData = {
  headingPrefix?: string;
  title: string;
  subtitle?: string;
  image: {
    src: string;
    alt: string;
  };
  items: readonly string[];
};

/** @deprecated Use ServicePanelSectionData */
export type ServiceSymptomsSectionData = ServicePanelSectionData;

export type ServiceCausesSectionData = ServicePanelSectionData;

export type ServiceTreatmentSectionData = {
  headingPrefix?: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  modalitiesLabel?: string;
  modalities: readonly string[];
  exercisesLabel?: string;
  exercises: {
    left: readonly string[];
    right: readonly string[];
  };
};

export type ServiceStageItem = {
  stage: string;
  label: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceStagesSectionData = {
  title: string;
  items: readonly ServiceStageItem[];
};

export type ServiceArthritisTypeItem = {
  name: string;
  shortName?: string;
  points: readonly string[];
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceTypesSectionData = {
  definition?: string;
  keySymptoms?: readonly string[];
  items: readonly ServiceArthritisTypeItem[];
  footer?: {
    primary: string;
    secondary: string;
  };
};

export type ServiceConditionAssessedItem = {
  label: string;
  href: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type ServiceConditionsAssessedSectionData = {
  eyebrow?: string;
  title?: {
    prefix: string;
    highlight: string;
  };
  description?: string;
  items: readonly ServiceConditionAssessedItem[];
};

export type ServiceSymptomsEvaluationItem = {
  label: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceSymptomsEvaluationSectionData = {
  title: string;
  description?: string;
  heroImage: {
    src: string;
    alt: string;
  };
  items: readonly ServiceSymptomsEvaluationItem[];
};

export type ServiceDiagnosticServiceItem = {
  label: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceDiagnosticServicesSectionData = {
  eyebrow?: string;
  title?: {
    prefix: string;
    highlight: string;
  };
  description?: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  items: readonly ServiceDiagnosticServiceItem[];
};

export type ServiceAdvancedDiagnosticItem = {
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceAdvancedDiagnosticSectionData = {
  eyebrow?: string;
  title?: {
    prefix: string;
    highlight: string;
  };
  description?: string;
  items: readonly ServiceAdvancedDiagnosticItem[];
};

export type ServiceIntroductionSectionData = {
  eyebrow?: string;
  title?: {
    prefix: string;
    highlight: string;
  };
  /** @deprecated Prefer `paragraphs` for multi-paragraph intros */
  description?: string;
  paragraphs?: readonly string[];
};

export type ServiceOverviewFeatureItem = {
  title: string;
  description?: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceOverviewSectionData = {
  eyebrow?: string;
  headerStyle?: "eyebrow" | "accent-line";
  title: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  description: string;
  secondaryDescription?: string;
  features: readonly ServiceOverviewFeatureItem[];
  callout?: {
    image: {
      src: string;
      alt: string;
    };
    message: string;
  };
  sideImage: {
    src: string;
    alt: string;
  };
  imagePosition?: "left" | "right";
  featureListStyle?: "spaced" | "divided" | "cards";
  primaryCta?: {
    label: string;
    href: string;
    icon?: {
      src: string;
      alt: string;
    };
  };
  secondaryCta?: {
    label: string;
    href: string;
    icon?: {
      src: string;
      alt: string;
    };
  };
  background?: "default" | "surface";
  layout?: "default" | "editorial" | "service-intro" | "split-intro";
  badgeIcon?: {
    src: string;
    alt: string;
  };
  introSubheading?: string;
};

export type ServiceSymptomIconItem = {
  label: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceSymptomsWeTreatSectionData = {
  eyebrow?: string;
  title?: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  items: readonly ServiceSymptomIconItem[];
};

export type ServiceCommonSymptomsCtaData = {
  message: string;
  scheduleTitle: string;
  scheduleDescription: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export type ServiceCommonSymptomsSectionData = {
  eyebrow?: string;
  title?: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  items: readonly ServiceSymptomIconItem[];
  cta?: ServiceCommonSymptomsCtaData;
};

export type ServiceTreatmentSolutionItem = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceTreatmentSolutionsSectionData = {
  eyebrow?: string;
  title?: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  description?: string;
  sideImage?: {
    src: string;
    alt: string;
  };
  items: readonly ServiceTreatmentSolutionItem[];
};

export type ServiceConditionWeTreatItem = {
  title: string;
  description?: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceConditionsWeTreatSectionData = {
  eyebrow?: string;
  title?: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  stackedTitle?: boolean;
  cardGridColumns?: 2 | 4;
  items: readonly ServiceConditionWeTreatItem[];
  sideImage: {
    src: string;
    alt: string;
  };
};

export type ServiceSymptomsGridSectionData = ServiceConditionsWeTreatSectionData;

export type ServiceRiskFactorsSectionData = ServiceBenefitsSectionData;

export type ServiceInfographicSectionData = {
  title?: {
    prefix: string;
    highlight: string;
  };
  image: {
    src: string;
    alt: string;
  };
  mobileHighlights?: readonly string[];
};

export type ServicePreventionTipItem = {
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
};

export type ServicePreventionTipsSectionData = {
  eyebrow?: string;
  title?: string;
  items: readonly ServicePreventionTipItem[];
  sideImage: {
    src: string;
    alt: string;
  };
  centerIcon?: {
    src: string;
    alt: string;
  };
};

export type ServicePhotoSymptomItem = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServicePhotoSymptomsSectionData = {
  title?: {
    prefix: string;
    highlight: string;
  };
  description?: string;
  items: readonly ServicePhotoSymptomItem[];
  callout?: {
    message: string;
  };
};

export type ServiceCausesRiskItem = {
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
};

export type ServiceCausesRiskSectionData = {
  title?: {
    prefix: string;
    highlight: string;
  };
  items: readonly ServiceCausesRiskItem[];
  sideImage: {
    src: string;
    alt: string;
  };
};

export type ServiceDietLifestyleItem = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceDietLifestyleColumnData = {
  title: string;
  items: readonly ServiceDietLifestyleItem[];
};

export type ServiceDietLifestyleSectionData = {
  title?: {
    prefix: string;
    highlight: string;
  };
  description?: string;
  avoid: ServiceDietLifestyleColumnData;
  include: ServiceDietLifestyleColumnData;
  callout?: {
    message: string;
  };
};

export type ServiceRehabilitationProgramItem = {
  title: string;
  description: string;
  photo: {
    src: string;
    alt: string;
  };
  icon: {
    src: string;
    alt: string;
  };
};

export type ServiceRehabilitationProgramsSectionData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: readonly ServiceRehabilitationProgramItem[];
};

export type ServiceInjectionTypeItem = {
  title: string;
  description: string;
  illustration: {
    src: string;
    alt: string;
  };
  icon: {
    src: string;
    alt: string;
  };
};

export type ServiceInjectionTypesSectionData = {
  title?: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  items: readonly ServiceInjectionTypeItem[];
};

export type ServiceStepByStepItem = {
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
};

export type ServiceStepByStepSectionData = {
  eyebrow?: string;
  title?: string;
  items: readonly ServiceStepByStepItem[];
};

export type ServiceBenefitItem = {
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
};

export type ServiceBenefitsSectionData = {
  title?: {
    prefix: string;
    highlight: string;
  };
  items: readonly ServiceBenefitItem[];
};

export type ServiceServicesWeProvideSectionData = {
  title?: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  headerAlign?: "left" | "center";
  titleInline?: boolean;
  gridColumns?: 2 | 3 | 4;
  items: readonly ServiceBenefitItem[];
};

export type ServiceHomeCareProgramsSectionData = ServiceBenefitsSectionData;

export type ServiceHomeCareTeamMember = {
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceHomeCareTeamSectionData = {
  title?: {
    prefix: string;
    highlight: string;
  };
  items: readonly ServiceHomeCareTeamMember[];
};

export type ServiceIntroHeroStatItem = {
  value: string;
  label: string;
  icon: {
    src: string;
    alt: string;
  };
};

export type ServiceIntroHeroSectionData = {
  eyebrow: string;
  eyebrowIcon: {
    src: string;
    alt: string;
  };
  title: {
    prefix: string;
    highlight: string;
  };
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  sideImage: {
    src: string;
    alt: string;
  };
  stats: readonly ServiceIntroHeroStatItem[];
};

export type ServiceSupportCtaSectionData = {
  title: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
};

export type ServicePageData = {
  slug: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  detailImage?: {
    src: string;
    alt: string;
  };
  symptomsSection?: ServicePanelSectionData;
  causesSection?: ServicePanelSectionData;
  treatmentSection?: ServiceTreatmentSectionData;
  typesSection?: ServiceTypesSectionData;
  conditionsAssessedSection?: ServiceConditionsAssessedSectionData;
  symptomsEvaluationSection?: ServiceSymptomsEvaluationSectionData;
  diagnosticServicesSection?: ServiceDiagnosticServicesSectionData;
  introductionSection?: ServiceIntroductionSectionData;
  overviewSection?: ServiceOverviewSectionData;
  symptomsGridSection?: ServiceSymptomsGridSectionData;
  riskFactorsSection?: ServiceRiskFactorsSectionData;
  benefitsInfographicSection?: ServiceInfographicSectionData;
  preventionTipsSection?: ServicePreventionTipsSectionData;
  photoSymptomsSection?: ServicePhotoSymptomsSectionData;
  causesRiskSection?: ServiceCausesRiskSectionData;
  dietLifestyleSection?: ServiceDietLifestyleSectionData;
  commonSymptomsSection?: ServiceCommonSymptomsSectionData;
  advancedDiagnosticSection?: ServiceAdvancedDiagnosticSectionData;
  symptomsWeTreatSection?: ServiceSymptomsWeTreatSectionData;
  treatmentSolutionsSection?: ServiceTreatmentSolutionsSectionData;
  conditionsWeTreatSection?: ServiceConditionsWeTreatSectionData;
  rehabilitationProgramsSection?: ServiceRehabilitationProgramsSectionData;
  injectionTypesSection?: ServiceInjectionTypesSectionData;
  stepByStepSection?: ServiceStepByStepSectionData;
  benefitsSection?: ServiceBenefitsSectionData;
  servicesWeProvideSection?: ServiceServicesWeProvideSectionData;
  supportCtaSection?: ServiceSupportCtaSectionData;
  homeCareProgramsSection?: ServiceHomeCareProgramsSectionData;
  homeCareTeamSection?: ServiceHomeCareTeamSectionData;
  introHeroSection?: ServiceIntroHeroSectionData;
  stagesSection?: ServiceStagesSectionData;
  paragraphs: readonly (readonly ServiceTextSegment[])[];
  meta: {
    title: string;
    description: string;
  };
};
