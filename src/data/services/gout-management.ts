import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const goutIntroImageDir = `${serviceScrollbarImageDir}/Gout managment/intros`;
const goutSymptomsImageDir = `${serviceScrollbarImageDir}/Gout managment/symptoms`;
const goutCausesRiskImageDir = `${serviceScrollbarImageDir}/Gout managment/causes and risk`;
const goutLifestyleImageDir = `${serviceScrollbarImageDir}/Gout managment/lifestyle`;

function goutIntroIcon(index: number) {
  return `${goutIntroImageDir}/icons${index}.png`;
}

function goutSymptomImage(filename: string) {
  return `${goutSymptomsImageDir}/${filename}`;
}

function goutCausesRiskIcon(index: number) {
  return `${goutCausesRiskImageDir}/icons${index}.png`;
}

function goutLifestyleImage(index: number) {
  return `${goutLifestyleImageDir}/img${index}.png`;
}

export const goutManagementService: ServicePageData = {
  slug: "gout-management",
  title: "Gout Management",
  image: {
    src: `${serviceScrollbarImageDir}/Gout Management.jpg`,
    alt: "Gout management at RAC Nepal",
  },
  meta: {
    title: "Gout Management",
    description: `Expert gout management at ${siteConfig.name} — uric acid control, flare prevention, and specialist rheumatology care in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Gout management focuses on controlling painful flares and lowering uric acid to protect joints long term.",
      },
    ],
  ],
  overviewSection: {
    headerStyle: "accent-line",
    title: {
      prefix: "What is",
      highlight: "Gout?",
    },
    description:
      "Gout is a form of inflammatory arthritis caused by high levels of uric acid in the blood, which form sharp crystals in the joints. It often leads to sudden, severe pain, swelling, and redness — most commonly in the big toe, ankle, or knee.",
    secondaryDescription: `At ${siteConfig.shortName}, our rheumatologists provide both acute flare treatment and long-term uric acid control to reduce attacks, protect joints, and help you stay active with confidence.`,
    features: [
      {
        title: "Early Diagnosis",
        description: "Identify gout early and begin the right treatment without delay.",
        image: {
          src: goutIntroIcon(1),
          alt: "Early diagnosis icon",
        },
      },
      {
        title: "Flare Prevention",
        description: "Lower uric acid levels to reduce painful gout attacks.",
        image: {
          src: goutIntroIcon(2),
          alt: "Flare prevention icon",
        },
      },
      {
        title: "Joint Protection",
        description: "Prevent long-term joint damage and complications.",
        image: {
          src: goutIntroIcon(3),
          alt: "Joint protection icon",
        },
      },
      {
        title: "Personalized Care",
        description: "Tailored medication, diet, and follow-up plans for you.",
        image: {
          src: goutIntroIcon(4),
          alt: "Personalized care icon",
        },
      },
    ],
    sideImage: {
      src: `${goutIntroImageDir}/side image.png`,
      alt: "Doctor explaining gout and foot joint inflammation to a patient",
    },
    imagePosition: "left",
    featureListStyle: "divided",
    background: "default",
    layout: "editorial",
  },
  photoSymptomsSection: {
    title: {
      prefix: "Symptoms of",
      highlight: "Gout",
    },
    description:
      "Recognizing the symptoms early can help in timely diagnosis and effective management.",
    items: [
      {
        title: "Intense Joint Pain",
        description:
          "Sudden and severe pain, often in the big toe, ankle, or knee.",
        image: {
          src: goutSymptomImage("intense joint pain.jpg"),
          alt: "Intense joint pain from gout",
        },
      },
      {
        title: "Redness & Warmth",
        description:
          "The affected joint may appear red and feel warm to the touch.",
        image: {
          src: goutSymptomImage("redness and warmth.jpg"),
          alt: "Redness and warmth in a gout-affected joint",
        },
      },
      {
        title: "Swelling",
        description: "Inflammation causes noticeable swelling around the joint.",
        image: {
          src: goutSymptomImage("swelling.jpg"),
          alt: "Swelling from gout inflammation",
        },
      },
      {
        title: "Limited Movement",
        description:
          "Joint stiffness and discomfort can make movement difficult.",
        image: {
          src: goutSymptomImage("limited movemnet.jpg"),
          alt: "Limited movement due to gout",
        },
      },
      {
        title: "Sudden Night Attacks",
        description:
          "Gout flare-ups often occur at night and can disrupt sleep.",
        image: {
          src: goutSymptomImage("night attack.jpg"),
          alt: "Sudden gout attack at night",
        },
      },
    ],
    callout: {
      message:
        "If you experience any of these symptoms, consult our rheumatology experts for proper evaluation and care.",
    },
  },
  causesRiskSection: {
    title: {
      prefix: "Causes &",
      highlight: "Risk Factors",
    },
    items: [
      {
        title: "High Uric Acid Levels",
        description:
          "Excess uric acid in the blood can lead to crystal formation in joints.",
        icon: {
          src: goutCausesRiskIcon(1),
          alt: "High uric acid levels icon",
        },
      },
      {
        title: "Diet (Red Meat, Alcohol)",
        description:
          "Foods high in purines and alcohol can increase uric acid levels.",
        icon: {
          src: goutCausesRiskIcon(2),
          alt: "Diet and alcohol icon",
        },
      },
      {
        title: "Obesity",
        description:
          "Excess weight can raise uric acid levels and increase joint stress.",
        icon: {
          src: goutCausesRiskIcon(3),
          alt: "Obesity icon",
        },
      },
      {
        title: "Genetics",
        description: "A family history of gout increases your risk.",
        icon: {
          src: goutCausesRiskIcon(4),
          alt: "Genetics icon",
        },
      },
      {
        title: "Kidney Issues",
        description:
          "Poor kidney function can reduce uric acid excretion, leading to buildup.",
        icon: {
          src: goutCausesRiskIcon(5),
          alt: "Kidney issues icon",
        },
      },
    ],
    sideImage: {
      src: `${goutCausesRiskImageDir}/side image.png`,
      alt: "Man experiencing gout pain in his foot at home",
    },
  },
  dietLifestyleSection: {
    title: {
      prefix: "Diet & Lifestyle",
      highlight: "Guidance",
    },
    description:
      "Smart food choices and healthy habits can help manage uric acid levels and reduce gout attacks.",
    avoid: {
      title: "Foods to Avoid",
      items: [
        {
          title: "Red Meat",
          description:
            "High in purines, which can increase uric acid levels.",
          image: {
            src: goutLifestyleImage(1),
            alt: "Raw red meat",
          },
        },
        {
          title: "Alcohol",
          description:
            "Especially beer and spirits can trigger gout attacks.",
          image: {
            src: goutLifestyleImage(2),
            alt: "Beer, wine, and spirits",
          },
        },
        {
          title: "Sugary Drinks",
          description:
            "Increase uric acid production and reduce its excretion.",
          image: {
            src: goutLifestyleImage(3),
            alt: "Sugary soda and cola",
          },
        },
      ],
    },
    include: {
      title: "Foods to Include",
      items: [
        {
          title: "Low-Fat Dairy",
          description:
            "Helps lower uric acid levels and supports bone health.",
          image: {
            src: goutLifestyleImage(4),
            alt: "Milk, yogurt, and cheese",
          },
        },
        {
          title: "Fruits",
          description:
            "Rich in vitamins and antioxidants that help reduce inflammation.",
          image: {
            src: goutLifestyleImage(5),
            alt: "Fresh assorted fruits",
          },
        },
        {
          title: "Water",
          description: "Stay hydrated to help flush uric acid from the body.",
          image: {
            src: goutLifestyleImage(6),
            alt: "Glass of water with splash",
          },
        },
      ],
    },
    callout: {
      message:
        "A balanced diet and healthy lifestyle can go a long way in preventing gout flare-ups and improving your overall well-being.",
    },
  },
};
