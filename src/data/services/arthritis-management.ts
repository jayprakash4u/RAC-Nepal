import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const arthritisManagementImageDir = `${serviceScrollbarImageDir}/Arthritis Management`;
const arthritisIntroImageDir = `${arthritisManagementImageDir}/intros`;
const arthritisStagesImageDir = `${arthritisManagementImageDir}/symptoms`;
const arthritisSymptomsImage = `${arthritisManagementImageDir}/symptoms.png?v=2`;
const arthritisCausesImage = `${arthritisManagementImageDir}/causes.jpg`;
const arthritisTreatmentImage = `${arthritisManagementImageDir}/treatment.jpg`;
const arthritisTypesImageDir = `${arthritisManagementImageDir}/types`;

function arthritisIntroIcon(index: number) {
  return `${arthritisIntroImageDir}/${index}.png`;
}

export const arthritisManagementService: ServicePageData = {
  slug: "arthritis-management",
  title: "Arthritis Management",
  image: {
    src: `${arthritisManagementImageDir}/Arthritis Management.jpg`,
    alt: "Arthritis management at RAC Nepal",
  },
  meta: {
    title: "Arthritis Management",
    description: `Expert arthritis management at ${siteConfig.name} — long-term care for rheumatoid arthritis, osteoarthritis, and inflammatory joint disease in Nepal.`,
  },
  overviewSection: {
    headerStyle: "accent-line",
    title: {
      prefix: "What is",
      highlight: "Arthritis Management?",
    },
    description:
      "Arthritis management focuses on controlling joint inflammation, relieving pain, and preserving mobility through specialist-led care. It combines medical treatment, lifestyle guidance, and regular monitoring to help you manage symptoms and maintain quality of life.",
    secondaryDescription: `At ${siteConfig.shortName}, our rheumatologists create personalized plans for rheumatoid arthritis, osteoarthritis, and related conditions — combining disease-modifying therapy, pain management, and structured follow-up as your needs change.`,
    features: [
      {
        title: "Pain Relief Strategies",
        description:
          "Use medications and therapies to control joint pain effectively.",
        image: {
          src: arthritisIntroIcon(1),
          alt: "Pain relief strategies icon",
        },
      },
      {
        title: "Inflammation Control",
        description:
          "Reduce swelling and stiffness to protect affected joints.",
        image: {
          src: arthritisIntroIcon(2),
          alt: "Inflammation control icon",
        },
      },
      {
        title: "Personalized Care Plans",
        description:
          "Follow tailored plans for medication, nutrition, and daily habits.",
        image: {
          src: arthritisIntroIcon(3),
          alt: "Personalized care plans icon",
        },
      },
      {
        title: "Long-term Joint Protection",
        description:
          "Protect joints and preserve mobility with ongoing specialist support.",
        image: {
          src: arthritisIntroIcon(4),
          alt: "Long-term joint protection icon",
        },
      },
    ],
    sideImage: {
      src: `${arthritisIntroImageDir}/side image.png`,
      alt: "Doctor explaining knee joint anatomy to a patient during consultation",
    },
    imagePosition: "left",
    featureListStyle: "divided",
    background: "default",
    layout: "editorial",
  },
  symptomsSection: {
    title: "Rheumatoid Arthritis",
    subtitle: "Symptoms",
    image: {
      src: arthritisSymptomsImage,
      alt: "Hand with highlighted joint pain areas — rheumatoid arthritis symptoms",
    },
    items: [
      "Pain & swelling in joints",
      "Morning stiffness",
      "Fatigue",
      "Loss of appetite",
      "Low-grade fever",
      "Nodules under the skin",
    ],
  },
  causesSection: {
    title: "Arthritis",
    image: {
      src: arthritisCausesImage,
      alt: "Person holding knee with joint inflammation — causes of arthritis",
    },
    items: [
      "Genetic factors",
      "Aging",
      "Injury to the joint",
      "Obesity",
      "Repetitive use of the joint",
      "Infection",
      "Autoimmune diseases",
      "Smoking",
    ],
  },
  treatmentSection: {
    title: "Arthritis",
    image: {
      src: arthritisTreatmentImage,
      alt: "Physiotherapy exercises for arthritis management",
    },
    modalities: [
      "Disease-modifying antirheumatic drugs (DMARDs)",
      "Biologic therapy",
      "Corticosteroid & joint injections",
      "Pain & anti-inflammatory medications",
      "Physiotherapy referral",
      "Ultrasound-guided procedures",
    ],
    exercises: {
      left: [
        "Range-of-motion exercises",
        "Strengthening with therabands",
        "Low-impact aerobic activity",
        "Joint protection techniques",
        "Guided physiotherapy sessions",
      ],
      right: [
        "Hamstring & quadriceps stretches",
        "Hydrotherapy",
        "Tai chi & gentle yoga",
        "Weight management support",
        "Step & balance exercises",
      ],
    },
  },
  typesSection: {
    items: [
      {
        name: "Osteoarthritis",
        shortName: "(OA)",
        points: [
          "Wear & tear of joints",
          "Knees, hips, spine",
          "Common after age 40",
        ],
        image: {
          src: `${arthritisTypesImageDir}/Osteoarthritis.jpg`,
          alt: "Osteoarthritis knee joint illustration",
        },
      },
      {
        name: "Rheumatoid Arthritis",
        shortName: "(RA)",
        points: [
          "Autoimmune disease",
          "Body attacks joints",
          "Both hands & feet",
        ],
        image: {
          src: `${arthritisTypesImageDir}/Rheumatoid Arthritis.jpg`,
          alt: "Rheumatoid arthritis hand joints illustration",
        },
      },
      {
        name: "Gout",
        points: [
          "High uric acid",
          "Severe toe pain",
          "Red, swollen joint",
        ],
        image: {
          src: `${arthritisTypesImageDir}/Gout.jpg`,
          alt: "Gout big toe joint illustration",
        },
      },
      {
        name: "Psoriatic Arthritis",
        points: [
          "With psoriasis",
          "Joint & skin issues",
          "Fingers & toes",
        ],
        image: {
          src: `${arthritisTypesImageDir}/Psoriatic Arthritis.jpg`,
          alt: "Psoriatic arthritis hand illustration",
        },
      },
      {
        name: "Ankylosing Spondylitis",
        points: [
          "Affects spine",
          "Back pain & stiffness",
          "Often in young adults",
        ],
        image: {
          src: `${arthritisTypesImageDir}/Ankylosing Spondylitis.jpg`,
          alt: "Ankylosing spondylitis spine illustration",
        },
      },
      {
        name: "Septic Arthritis",
        points: [
          "Joint infection",
          "Severe pain & fever",
          "Medical emergency",
        ],
        image: {
          src: `${arthritisTypesImageDir}/Septic Arthritis.jpg`,
          alt: "Septic arthritis knee infection illustration",
        },
      },
      {
        name: "Juvenile Arthritis",
        points: [
          "Affects children",
          "Joint swelling & stiffness",
          "Needs specialist care",
        ],
        image: {
          src: `${arthritisTypesImageDir}/Juvenile Arthritis.jpg`,
          alt: "Juvenile arthritis illustration",
        },
      },
      {
        name: "Reactive Arthritis",
        points: [
          "After infection",
          "Joint inflammation",
          "Often knees & ankles",
        ],
        image: {
          src: `${arthritisTypesImageDir}/Reactive Arthritis.jpg`,
          alt: "Reactive arthritis joint illustration",
        },
      },
    ],
  },
  stagesSection: {
    title: "Stages of Rheumatoid Arthritis",
    items: [
      {
        stage: "Stage 1",
        label: "Pre-Clinical",
        description:
          "Symptoms have not yet begun, but there may be markers of the disease detectable in your blood.",
        image: {
          src: `${arthritisStagesImageDir}/1.png`,
          alt: "Stage 1 pre-clinical rheumatoid arthritis joint illustration",
        },
      },
      {
        stage: "Stage 2",
        label: "Early",
        description:
          "Less than 6 months of the first symptoms (e.g., morning stiffness of the joints).",
        image: {
          src: `${arthritisStagesImageDir}/2.png`,
          alt: "Stage 2 early rheumatoid arthritis joint illustration",
        },
      },
      {
        stage: "Stage 3",
        label: "Late/Established",
        description:
          "6 months – 2 years since onset or when tests reveal both cartilage and bone destruction.",
        image: {
          src: `${arthritisStagesImageDir}/3.png`,
          alt: "Stage 3 late rheumatoid arthritis joint illustration",
        },
      },
      {
        stage: "Stage 4",
        label: "End-Stage",
        description:
          "Damage becomes so severe that the joints can fuse together.",
        image: {
          src: `${arthritisStagesImageDir}/4.png`,
          alt: "Stage 4 end-stage rheumatoid arthritis joint illustration",
        },
      },
    ],
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Arthritis management at RAC Nepal helps control inflammation, relieve pain, and protect long-term mobility.",
      },
    ],
  ],
};
