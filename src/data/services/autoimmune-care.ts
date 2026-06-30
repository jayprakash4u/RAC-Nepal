import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const autoimmuneIntroImageDir = `${serviceScrollbarImageDir}/autoimmune care/intros`;

function autoimmuneIntroIcon(index: number) {
  return `${autoimmuneIntroImageDir}/${index}.png`;
}
const autoimmuneSymptomsImageDir = `${serviceScrollbarImageDir}/autoimmune care/symptoms`;

function autoimmuneSymptomIcon(index: number) {
  return `${autoimmuneSymptomsImageDir}/${index}.png`;
}

const autoimmuneDiagnosticIconsDir = `${serviceScrollbarImageDir}/autoimmune care/diagnostic services/icons`;
const autoimmuneDiagnosticPhotosDir = `${serviceScrollbarImageDir}/autoimmune care/diagnostic services/images`;

function autoimmuneDiagnosticIcon(index: number) {
  return `${autoimmuneDiagnosticIconsDir}/${index}.png`;
}

function autoimmuneDiagnosticPhoto(index: number) {
  return `${autoimmuneDiagnosticPhotosDir}/diagnostic_image_${index}.jpg`;
}

export const autoimmuneCareService: ServicePageData = {
  slug: "autoimmune-care",
  title: "Autoimmune Care",
  image: {
    src: `${serviceScrollbarImageDir}/Autoimmune Care.jpg`,
    alt: "Autoimmune care at RAC Nepal",
  },
  meta: {
    title: "Autoimmune Care",
    description: `Expert autoimmune care at ${siteConfig.name} — specialist diagnosis and treatment for lupus, rheumatoid arthritis, and other autoimmune rheumatic diseases in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Autoimmune care",
      },
      {
        type: "text",
        value:
          " focuses on conditions in which the immune system mistakenly attacks the body's own tissues, often affecting joints, skin, kidneys, blood vessels, and other organs. Common examples include systemic lupus erythematosus, rheumatoid arthritis, Sjögren's syndrome, and vasculitis.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Because autoimmune diseases can be complex and change over time, specialist rheumatology care is essential. Treatment may include ",
      },
      {
        type: "strong",
        value:
          "immunosuppressive therapy, anti-inflammatory medications, laboratory monitoring, organ protection, and coordinated long-term follow-up",
      },
      {
        type: "text",
        value:
          " tailored to each patient's needs.",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists provide comprehensive autoimmune assessment and ongoing management under one roof. If you have unexplained joint pain, rashes, fatigue, fever, or multi-organ symptoms, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert autoimmune care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
  overviewSection: {
    eyebrow: "Understanding Autoimmune Diseases",
    title: {
      prefix: "What Are",
      highlight: "Autoimmune Diseases?",
    },
    description:
      "Autoimmune diseases occur when the immune system mistakenly attacks the body's own healthy tissues, leading to inflammation and damage across various organs and joints.",
    features: [
      {
        title: "Immune System Imbalance",
        description:
          "The immune system fails to distinguish between harmful invaders and normal cells, triggering chronic inflammation.",
        image: {
          src: autoimmuneIntroIcon(1),
          alt: "Immune system imbalance icon",
        },
      },
      {
        title: "Multi-System Impact",
        description:
          "These conditions can affect joints, skin, kidneys, blood vessels, and other organs at the same time.",
        image: {
          src: autoimmuneIntroIcon(2),
          alt: "Multi-system impact icon",
        },
      },
      {
        title: "Chronic & Fluctuating Nature",
        description:
          "Symptoms often come and go, with periods of flare-ups followed by remission.",
        image: {
          src: autoimmuneIntroIcon(3),
          alt: "Chronic and fluctuating nature icon",
        },
      },
    ],
    callout: {
      image: {
        src: `${autoimmuneIntroImageDir}/hearticons.png`,
        alt: "Heart care icon",
      },
      message:
        "With early diagnosis and the right care, symptoms can be managed, and quality of life can be significantly improved.",
    },
    sideImage: {
      src: `${autoimmuneIntroImageDir}/side image.png`,
      alt: "Woman experiencing joint pain with autoimmune disease illustration",
    },
  },
  commonSymptomsSection: {
    title: {
      prefix: "Common",
      highlight: "Symptoms",
      suffix: "of Autoimmune Disease",
    },
    items: [
      {
        label: "Persistent Joint Pain",
        image: {
          src: autoimmuneSymptomIcon(1),
          alt: "Persistent joint pain icon",
        },
      },
      {
        label: "Chronic Fatigue",
        image: {
          src: autoimmuneSymptomIcon(2),
          alt: "Chronic fatigue icon",
        },
      },
      {
        label: "Joint Swelling",
        image: {
          src: autoimmuneSymptomIcon(3),
          alt: "Joint swelling icon",
        },
      },
      {
        label: "Muscle Weakness",
        image: {
          src: autoimmuneSymptomIcon(4),
          alt: "Muscle weakness icon",
        },
      },
      {
        label: "Morning Stiffness",
        image: {
          src: autoimmuneSymptomIcon(5),
          alt: "Morning stiffness icon",
        },
      },
      {
        label: "Skin Rashes",
        image: {
          src: autoimmuneSymptomIcon(6),
          alt: "Skin rashes icon",
        },
      },
      {
        label: "Dry Eyes & Dry Mouth",
        image: {
          src: autoimmuneSymptomIcon(7),
          alt: "Dry eyes and dry mouth icon",
        },
      },
      {
        label: "Unexplained Fever",
        image: {
          src: autoimmuneSymptomIcon(8),
          alt: "Unexplained fever icon",
        },
      },
    ],
    cta: {
      message:
        "Experiencing one or more of these symptoms? Early diagnosis and treatment can help manage symptoms and prevent complications.",
      scheduleTitle: "Schedule a Consultation",
      scheduleDescription:
        "Our specialists are here to help you feel better and live better.",
      buttonLabel: "Book Appointment",
    },
  },
  advancedDiagnosticSection: {
    title: {
      prefix: "Advanced",
      highlight: "Diagnostic Services",
    },
    description:
      "Accurate diagnosis is the first step to effective treatment. Our advanced diagnostic services help detect autoimmune conditions early and monitor disease activity.",
    items: [
      {
        title: "Autoimmune Screening",
        description: "ANA, RF, Anti-CCP testing",
        icon: {
          src: autoimmuneDiagnosticIcon(1),
          alt: "Autoimmune screening icon",
        },
        image: {
          src: autoimmuneDiagnosticPhoto(1),
          alt: "Laboratory ANA blood test sample",
        },
      },
      {
        title: "Inflammatory Marker Testing",
        description: "ESR & CRP evaluation",
        icon: {
          src: autoimmuneDiagnosticIcon(2),
          alt: "Inflammatory marker testing icon",
        },
        image: {
          src: autoimmuneDiagnosticPhoto(2),
          alt: "Inflammatory marker blood test and lab report",
        },
      },
      {
        title: "Joint Ultrasound",
        description: "Early inflammation detection",
        icon: {
          src: autoimmuneDiagnosticIcon(3),
          alt: "Joint ultrasound icon",
        },
        image: {
          src: autoimmuneDiagnosticPhoto(3),
          alt: "Joint ultrasound examination",
        },
      },
      {
        title: "X-Ray Evaluation",
        description: "Joint damage assessment",
        icon: {
          src: autoimmuneDiagnosticIcon(4),
          alt: "X-ray evaluation icon",
        },
        image: {
          src: autoimmuneDiagnosticPhoto(4),
          alt: "Doctor reviewing joint X-ray images",
        },
      },
      {
        title: "Bone Density Scan",
        description: "Osteoporosis assessment",
        icon: {
          src: autoimmuneDiagnosticIcon(5),
          alt: "Bone density scan icon",
        },
        image: {
          src: autoimmuneDiagnosticPhoto(5),
          alt: "Patient undergoing bone density scan",
        },
      },
      {
        title: "Comprehensive Lab Analysis",
        description: "Advanced disease monitoring",
        icon: {
          src: autoimmuneDiagnosticIcon(6),
          alt: "Comprehensive lab analysis icon",
        },
        image: {
          src: autoimmuneDiagnosticPhoto(6),
          alt: "Laboratory microscope and blood samples",
        },
      },
    ],
  },
};
