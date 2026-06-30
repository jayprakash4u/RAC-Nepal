import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const arthritisManagementIntroImageDir = `${serviceScrollbarImageDir}/arthritis-management/intros`;
const conditionImageDir = "/images/condition";
const symptomsEvaluationImageDir = `${serviceScrollbarImageDir}/arthritis-management`;
const symptomsEvaluationIconsDir = `${symptomsEvaluationImageDir}/symptoms`;

function symptomsEvaluationIcon(index: number) {
  return `${symptomsEvaluationIconsDir}/${index}.png`;
}

const diagnosticServicesImageDir = `${symptomsEvaluationImageDir}/services availables`;

function diagnosticServiceIcon(index: number) {
  return `${diagnosticServicesImageDir}/${index}.png`;
}

function arthritisIntroIcon(index: number) {
  return `${arthritisManagementIntroImageDir}/${index}.png`;
}

export const rheumatologyConsultationService: ServicePageData = {
  slug: "rheumatology-consultation",
  title: "Rheumatology Consultation",
  image: {
    src: `${serviceScrollbarImageDir}/Rheumatology Consultation.jpg`,
    alt: "Rheumatology consultation at RAC Nepal",
  },
  meta: {
    title: "Rheumatology Consultation",
    description: `Expert rheumatology consultation at ${siteConfig.name} — specialist assessment for joint pain, arthritis, and autoimmune conditions in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Rheumatology consultation is the first step toward expert care for joint pain, arthritis, and autoimmune conditions at RAC Nepal.",
      },
    ],
  ],
  overviewSection: {
    headerStyle: "accent-line",
    title: {
      prefix: "What is",
      highlight: "Rheumatology Consultation?",
    },
    description:
      "Rheumatology consultation is a specialist assessment for joint pain, arthritis, and autoimmune conditions. It helps identify the underlying cause of your symptoms and guides the right treatment plan before joint damage or complications progress.",
    secondaryDescription: `At ${siteConfig.shortName}, our rheumatologists provide expert evaluation, personalized treatment planning, and ongoing follow-up for conditions such as rheumatoid arthritis, lupus, gout, and other rheumatic diseases.`,
    features: [
      {
        title: "Inflammation Control",
        description:
          "Helps reduce swelling and control disease activity in affected joints.",
        image: {
          src: arthritisIntroIcon(1),
          alt: "Inflammation control icon",
        },
      },
      {
        title: "Pain Relief",
        description:
          "Relieves joint pain and discomfort for better daily function.",
        image: {
          src: arthritisIntroIcon(2),
          alt: "Pain relief icon",
        },
      },
      {
        title: "Joint Protection",
        description:
          "Protects joints from long-term damage and deformity.",
        image: {
          src: arthritisIntroIcon(3),
          alt: "Joint protection icon",
        },
      },
      {
        title: "Improved Mobility",
        description:
          "Restores movement and helps you stay active with confidence.",
        image: {
          src: arthritisIntroIcon(4),
          alt: "Improved mobility icon",
        },
      },
    ],
    sideImage: {
      src: `${arthritisManagementIntroImageDir}/side image.png`,
      alt: "Doctor explaining hand joint anatomy to a patient during consultation",
    },
    imagePosition: "left",
    featureListStyle: "divided",
    background: "default",
    layout: "editorial",
  },
  symptomsEvaluationSection: {
    title: "Symptoms That Need Evaluation",
    description:
      "These symptoms may indicate an underlying rheumatic or autoimmune condition that needs expert evaluation and timely treatment.",
    heroImage: {
      src: `${symptomsEvaluationIconsDir}/side background image.png`,
      alt: "Woman with shoulder and neck pain highlighted for rheumatology evaluation",
    },
    items: [
      {
        label: "Persistent joint pain",
        image: {
          src: symptomsEvaluationIcon(1),
          alt: "Persistent joint pain icon",
        },
      },
      {
        label: "Morning stiffness",
        image: {
          src: symptomsEvaluationIcon(2),
          alt: "Morning stiffness icon",
        },
      },
      {
        label: "Joint swelling",
        image: {
          src: symptomsEvaluationIcon(3),
          alt: "Joint swelling icon",
        },
      },
      {
        label: "Back pain",
        image: {
          src: symptomsEvaluationIcon(4),
          alt: "Back pain icon",
        },
      },
      {
        label: "Muscle pain",
        image: {
          src: symptomsEvaluationIcon(5),
          alt: "Muscle pain icon",
        },
      },
      {
        label: "Fatigue",
        image: {
          src: symptomsEvaluationIcon(6),
          alt: "Fatigue icon",
        },
      },
      {
        label: "Recurrent gout attacks",
        image: {
          src: symptomsEvaluationIcon(7),
          alt: "Recurrent gout attacks icon",
        },
      },
      {
        label: "Difficulty walking",
        image: {
          src: symptomsEvaluationIcon(8),
          alt: "Difficulty walking icon",
        },
      },
      {
        label: "Reduced mobility",
        image: {
          src: symptomsEvaluationIcon(9),
          alt: "Reduced mobility icon",
        },
      },
      {
        label: "Unexplained inflammation",
        image: {
          src: symptomsEvaluationIcon(10),
          alt: "Unexplained inflammation icon",
        },
      },
    ],
  },
  diagnosticServicesSection: {
    description:
      "Advanced diagnostic tools and accurate testing help us identify the root cause of your condition and guide the best treatment.",
    heroImage: {
      src: `${diagnosticServicesImageDir}/sidebgimage.png`,
      alt: "Medical professional reviewing diagnostic results",
    },
    items: [
      {
        label: "Blood Tests",
        image: {
          src: diagnosticServiceIcon(1),
          alt: "Blood tests icon",
        },
      },
      {
        label: "Autoimmune Screening",
        image: {
          src: diagnosticServiceIcon(2),
          alt: "Autoimmune screening icon",
        },
      },
      {
        label: "Joint Fluid Analysis",
        image: {
          src: diagnosticServiceIcon(3),
          alt: "Joint fluid analysis icon",
        },
      },
      {
        label: "X-Ray Evaluation",
        image: {
          src: diagnosticServiceIcon(4),
          alt: "X-ray evaluation icon",
        },
      },
      {
        label: "Musculoskeletal Ultrasound",
        image: {
          src: diagnosticServiceIcon(5),
          alt: "Musculoskeletal ultrasound icon",
        },
      },
      {
        label: "Bone Density Assessment",
        image: {
          src: diagnosticServiceIcon(6),
          alt: "Bone density assessment icon",
        },
      },
    ],
  },
  conditionsAssessedSection: {
    items: [
      {
        label: "Rheumatoid Arthritis",
        href: "/conditions/rheumatoid-arthritis",
        image: {
          src: `${conditionImageDir}/Rheumatoid Arthritis.png`,
          alt: "Rheumatoid arthritis",
        },
      },
      {
        label: "Osteoarthritis",
        href: "/conditions/osteoarthritis",
        image: {
          src: `${conditionImageDir}/Osteoarthritis.png`,
          alt: "Osteoarthritis",
        },
      },
      {
        label: "Gout",
        href: "/conditions/gout",
        image: {
          src: `${conditionImageDir}/Gout.png`,
          alt: "Gout",
        },
      },
      {
        label: "Ankylosing Spondylitis",
        href: "/conditions/ankylosing-spondylitis",
        image: {
          src: `${conditionImageDir}/Ankylosing Spondylitis.png`,
          alt: "Ankylosing spondylitis",
        },
      },
      {
        label: "Psoriatic Arthritis",
        href: "/conditions/psoriatic-arthritis",
        image: {
          src: `${conditionImageDir}/Psoriatic Arthritis.png`,
          alt: "Psoriatic arthritis",
        },
      },
      {
        label: "Lupus (SLE)",
        href: "/conditions/systemic-lupus-erythematosus",
        image: {
          src: `${conditionImageDir}/Systemic Lupus Erythematosus (SLE).png`,
          alt: "Systemic lupus erythematosus",
        },
      },
      {
        label: "Fibromyalgia",
        href: "/conditions/fibromyalgia",
        image: {
          src: `${conditionImageDir}/fibromyalgia.png`,
          alt: "Fibromyalgia",
        },
      },
      {
        label: "Osteoporosis",
        href: "/conditions/osteoporosis",
        image: {
          src: `${conditionImageDir}/osteoporosis.png`,
          alt: "Osteoporosis",
        },
      },
      {
        label: "Vasculitis",
        href: "/conditions/vasculitis",
        image: {
          src: `${conditionImageDir}/vasculitis.png`,
          alt: "Vasculitis",
        },
      },
      {
        label: "Children's Arthritis",
        href: "/conditions/juvenile-idiopathic-arthritis",
        image: {
          src: `${conditionImageDir}/Juvenile Idiopathic Arthritis (Children's Arthritis).png`,
          alt: "Juvenile idiopathic arthritis",
        },
      },
    ],
  },
};
