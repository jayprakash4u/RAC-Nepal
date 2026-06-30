import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const osteoporosisIntroImageDir = `${serviceScrollbarImageDir}/osteoporosis-care/intros`;
const osteoporosisSymptomsImageDir = `${serviceScrollbarImageDir}/osteoporosis-care/symptoms`;
const osteoporosisRiskImageDir = `${serviceScrollbarImageDir}/osteoporosis-care/Risk`;
const osteoporosisPreventionImageDir = `${serviceScrollbarImageDir}/osteoporosis-care/steps for stronger`;

const osteoporosisPreventionIconFiles = [
  "Screenshot_2026-06-26_173307-removebg-preview.png",
  "Screenshot_2026-06-26_173312-removebg-preview.png",
  "Screenshot_2026-06-26_173315-removebg-preview.png",
  "Screenshot_2026-06-26_173321-removebg-preview.png",
  "Screenshot_2026-06-26_173327-removebg-preview.png",
  "Screenshot_2026-06-26_173330-removebg-preview.png",
] as const;

const osteoporosisPreventionCenterIcon =
  "Screenshot_2026-06-26_173339-removebg-preview.png";

function osteoporosisIntroIcon(index: number) {
  return `${osteoporosisIntroImageDir}/icons${index}.png`;
}

function osteoporosisSymptomIcon(index: number) {
  return `${osteoporosisSymptomsImageDir}/icons${index}.png`;
}

function osteoporosisRiskIcon(index: number) {
  return `${osteoporosisRiskImageDir}/icons${index}.png`;
}

function osteoporosisPreventionIcon(index: number) {
  return `${osteoporosisPreventionImageDir}/${osteoporosisPreventionIconFiles[index - 1]}`;
}

export const osteoporosisCareService: ServicePageData = {
  slug: "osteoporosis-care",
  title: "Osteoporosis Care",
  image: {
    src: `${serviceScrollbarImageDir}/Osteoporosis Care.jpg`,
    alt: "Osteoporosis care at RAC Nepal",
  },
  meta: {
    title: "Osteoporosis Care",
    description: `Osteoporosis care at ${siteConfig.name} — bone health assessment, fracture prevention, and specialist rheumatology support in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Osteoporosis care focuses on protecting bone strength and reducing fracture risk through specialist assessment and personalized treatment.",
      },
    ],
  ],
  overviewSection: {
    headerStyle: "accent-line",
    title: {
      prefix: "What is",
      highlight: "Osteoporosis?",
    },
    description:
      "Osteoporosis is a condition that weakens bones, making them fragile and more likely to break. It develops gradually and is often diagnosed only after a fracture occurs, especially in the spine, hip, or wrist.",
    secondaryDescription: `At ${siteConfig.shortName}, we help patients understand bone health early through risk assessment, bone density review when available, and personalized plans that combine nutrition guidance, lifestyle support, and treatment to protect mobility and independence.`,
    features: [
      {
        title: "Early Diagnosis",
        description: "Identify bone health risks before fractures occur.",
        image: {
          src: osteoporosisIntroIcon(1),
          alt: "Early diagnosis icon",
        },
      },
      {
        title: "Stronger Bones",
        description: "Support bone density with guided care plans.",
        image: {
          src: osteoporosisIntroIcon(2),
          alt: "Stronger bones icon",
        },
      },
      {
        title: "Fracture Prevention",
        description: "Reduce fall and fracture risk through proactive treatment.",
        image: {
          src: osteoporosisIntroIcon(3),
          alt: "Fracture prevention icon",
        },
      },
      {
        title: "Healthy Aging",
        description: "Maintain mobility and independence as you age.",
        image: {
          src: osteoporosisIntroIcon(4),
          alt: "Healthy aging icon",
        },
      },
    ],
    sideImage: {
      src: `${osteoporosisIntroImageDir}/leftsideimage.png`,
      alt: "Doctor explaining bone health to a patient using a femur model",
    },
    imagePosition: "left",
    featureListStyle: "divided",
    background: "default",
    layout: "editorial",
  },
  symptomsGridSection: {
    title: {
      prefix: "Symptoms of",
      highlight: "Osteoporosis",
    },
    cardGridColumns: 2,
    items: [
      {
        title: "Frequent Back Pain",
        description: "Persistent pain in the back.",
        image: {
          src: osteoporosisSymptomIcon(1),
          alt: "Frequent back pain icon",
        },
      },
      {
        title: "Loss of Height",
        description: "Noticeable reduction in height over time.",
        image: {
          src: osteoporosisSymptomIcon(2),
          alt: "Loss of height icon",
        },
      },
      {
        title: "Stooped Posture",
        description: "Rounded shoulders or hunched back.",
        image: {
          src: osteoporosisSymptomIcon(3),
          alt: "Stooped posture icon",
        },
      },
      {
        title: "Fragility Fractures",
        description: "Bones break easily from minor falls.",
        image: {
          src: osteoporosisSymptomIcon(4),
          alt: "Fragility fractures icon",
        },
      },
      {
        title: "Weak Bones",
        description: "Decreased bone density and strength.",
        image: {
          src: osteoporosisSymptomIcon(5),
          alt: "Weak bones icon",
        },
      },
      {
        title: "Hip Pain",
        description: "Discomfort or pain in the hip area.",
        image: {
          src: osteoporosisSymptomIcon(6),
          alt: "Hip pain icon",
        },
      },
      {
        title: "Wrist Fractures",
        description: "Wrist breaks from low-impact injuries.",
        image: {
          src: osteoporosisSymptomIcon(7),
          alt: "Wrist fractures icon",
        },
      },
      {
        title: "Poor Balance",
        description: "Unsteadiness leading to falls.",
        image: {
          src: osteoporosisSymptomIcon(8),
          alt: "Poor balance icon",
        },
      },
    ],
    sideImage: {
      src: `${osteoporosisSymptomsImageDir}/side image.png`,
      alt: "Doctor examining an elderly patient with back pain in a clinic",
    },
  },
  riskFactorsSection: {
    title: {
      prefix: "Who is at",
      highlight: "Risk?",
    },
    items: [
      {
        title: "Women After Menopause",
        description: "Higher risk due to reduced estrogen levels.",
        icon: {
          src: osteoporosisRiskIcon(1),
          alt: "Women after menopause icon",
        },
      },
      {
        title: "Older Adults",
        description: "Bone density naturally decreases with age.",
        icon: {
          src: osteoporosisRiskIcon(2),
          alt: "Older adults icon",
        },
      },
      {
        title: "Family History",
        description: "Genetics increase osteoporosis risk.",
        icon: {
          src: osteoporosisRiskIcon(3),
          alt: "Family history icon",
        },
      },
      {
        title: "Calcium Deficiency",
        description: "Poor nutrition weakens bones.",
        icon: {
          src: osteoporosisRiskIcon(4),
          alt: "Calcium deficiency icon",
        },
      },
      {
        title: "Long-term Steroid Use",
        description: "Certain medications reduce bone strength.",
        icon: {
          src: osteoporosisRiskIcon(5),
          alt: "Long-term steroid use icon",
        },
      },
      {
        title: "Lack of Exercise",
        description: "Inactive lifestyle accelerates bone loss.",
        icon: {
          src: osteoporosisRiskIcon(6),
          alt: "Lack of exercise icon",
        },
      },
      {
        title: "Smoking & Alcohol",
        description: "Negatively affects bone density.",
        icon: {
          src: osteoporosisRiskIcon(7),
          alt: "Smoking and alcohol icon",
        },
      },
      {
        title: "Autoimmune Diseases",
        description: "Rheumatoid arthritis and lupus increase risk.",
        icon: {
          src: osteoporosisRiskIcon(8),
          alt: "Autoimmune diseases icon",
        },
      },
    ],
  },
  benefitsInfographicSection: {
    title: {
      prefix: "Benefits of",
      highlight: "Osteoporosis Care",
    },
    image: {
      src: `${serviceScrollbarImageDir}/osteoporosis-care/benefits.png`,
      alt: "Infographic showing the benefits of osteoporosis care including stronger bones, healthy aging, independence, better posture, reduced fracture risk, pain relief, improved mobility, and better balance",
    },
  },
  preventionTipsSection: {
    eyebrow: "Prevention Tips",
    title: "Simple Steps for Stronger Bones Every Day",
    items: [
      {
        title: "Calcium-rich Diet",
        description: "Milk, yogurt, cheese, leafy vegetables.",
        icon: {
          src: osteoporosisPreventionIcon(1),
          alt: "Calcium-rich diet icon",
        },
      },
      {
        title: "Vitamin D",
        description: "Sunlight and supplements.",
        icon: {
          src: osteoporosisPreventionIcon(2),
          alt: "Vitamin D icon",
        },
      },
      {
        title: "Regular Exercise",
        description: "Walking, resistance training.",
        icon: {
          src: osteoporosisPreventionIcon(3),
          alt: "Regular exercise icon",
        },
      },
      {
        title: "Quit Smoking",
        description: "Improve bone health.",
        icon: {
          src: osteoporosisPreventionIcon(4),
          alt: "Quit smoking icon",
        },
      },
      {
        title: "Limit Alcohol",
        description: "Reduce bone weakening.",
        icon: {
          src: osteoporosisPreventionIcon(5),
          alt: "Limit alcohol icon",
        },
      },
      {
        title: "Prevent Falls",
        description: "Use proper footwear and home safety measures.",
        icon: {
          src: osteoporosisPreventionIcon(6),
          alt: "Prevent falls icon",
        },
      },
    ],
    sideImage: {
      src: `${osteoporosisPreventionImageDir}/side image.png`,
      alt: "Elderly couple walking together in a park for bone health",
    },
    centerIcon: {
      src: `${osteoporosisPreventionImageDir}/${osteoporosisPreventionCenterIcon}`,
      alt: "Bone health icon",
    },
  },
};
