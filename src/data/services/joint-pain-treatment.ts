import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const jointPainIntroImageDir = `${serviceScrollbarImageDir}/joint pain treatment/intros`;
const jointPainSymptomsImageDir = `${serviceScrollbarImageDir}/joint pain treatment/symptoms we treat`;

function jointPainIntroIcon(index: number) {
  return `${jointPainIntroImageDir}/${index}.png`;
}

function jointPainSymptomIcon(index: number) {
  return `${jointPainSymptomsImageDir}/${index}.png`;
}

const jointPainTreatmentSolutionsImageDir = `${serviceScrollbarImageDir}/joint pain treatment/Treatment solutions`;

function jointPainTreatmentIcon(index: number) {
  return `${jointPainTreatmentSolutionsImageDir}/${index}-removebg-preview.png`;
}

export const jointPainTreatmentService: ServicePageData = {
  slug: "joint-pain-treatment",
  title: "Joint Pain Treatment",
  image: {
    src: `${serviceScrollbarImageDir}/Joint Pain Treatment.jpg`,
    alt: "Joint pain treatment at RAC Nepal",
  },
  meta: {
    title: "Joint Pain Treatment",
    description: `Expert joint pain treatment at ${siteConfig.name} — specialist care for inflammatory, mechanical, and arthritis-related joint pain in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Joint pain treatment at RAC Nepal focuses on relieving discomfort and restoring comfortable movement.",
      },
    ],
  ],
  overviewSection: {
    headerStyle: "accent-line",
    title: {
      prefix: "What is",
      highlight: "Joint Pain Treatment?",
    },
    description:
      "Joint pain treatment focuses on identifying the root cause of discomfort and providing targeted solutions to relieve pain and restore function. It may include medications, therapies, and minimally invasive procedures.",
    secondaryDescription: `Early treatment helps prevent worsening conditions and supports long-term joint health and mobility. At ${siteConfig.shortName}, our rheumatologists build personalized plans based on your symptoms, examination findings, and underlying diagnosis.`,
    features: [
      {
        title: "Accurate Diagnosis",
        description:
          "Identify the underlying cause of joint pain for effective treatment.",
        image: {
          src: jointPainIntroIcon(1),
          alt: "Accurate diagnosis icon",
        },
      },
      {
        title: "Effective Pain Relief",
        description:
          "Provide treatments that quickly reduce discomfort and inflammation.",
        image: {
          src: jointPainIntroIcon(2),
          alt: "Effective pain relief icon",
        },
      },
      {
        title: "Mobility Restoration",
        description:
          "Improve joint flexibility and support daily movement.",
        image: {
          src: jointPainIntroIcon(3),
          alt: "Mobility restoration icon",
        },
      },
      {
        title: "Personalized Care",
        description:
          "Tailor treatment plans based on individual needs and conditions.",
        image: {
          src: jointPainIntroIcon(4),
          alt: "Personalized care icon",
        },
      },
    ],
    sideImage: {
      src: `${jointPainIntroImageDir}/side image.png`,
      alt: "Doctor examining a patient's knee during joint pain consultation",
    },
    imagePosition: "left",
    featureListStyle: "divided",
    background: "default",
    layout: "editorial",
  },
  symptomsWeTreatSection: {
    title: {
      prefix: "Common",
      highlight: "Symptoms",
      suffix: "We Treat",
    },
    items: [
      {
        label: "Persistent Joint Pain",
        image: {
          src: jointPainSymptomIcon(1),
          alt: "Persistent joint pain icon",
        },
      },
      {
        label: "Joint Swelling",
        image: {
          src: jointPainSymptomIcon(2),
          alt: "Joint swelling icon",
        },
      },
      {
        label: "Morning Stiffness",
        image: {
          src: jointPainSymptomIcon(3),
          alt: "Morning stiffness icon",
        },
      },
      {
        label: "Limited Range of Motion",
        image: {
          src: jointPainSymptomIcon(4),
          alt: "Limited range of motion icon",
        },
      },
      {
        label: "Joint Warmth & Tenderness",
        image: {
          src: jointPainSymptomIcon(5),
          alt: "Joint warmth and tenderness icon",
        },
      },
      {
        label: "Difficulty Walking",
        image: {
          src: jointPainSymptomIcon(6),
          alt: "Difficulty walking icon",
        },
      },
      {
        label: "Muscle Weakness",
        image: {
          src: jointPainSymptomIcon(7),
          alt: "Muscle weakness icon",
        },
      },
      {
        label: "Chronic Back Pain",
        image: {
          src: jointPainSymptomIcon(8),
          alt: "Chronic back pain icon",
        },
      },
    ],
  },
  treatmentSolutionsSection: {
    eyebrow: "Treatment Options",
    title: {
      prefix: "Comprehensive Joint Pain",
      highlight: "Treatment",
      suffix: "Solutions",
    },
    description:
      "Personalized care plans designed to reduce pain, restore mobility, and improve long-term joint health.",
    sideImage: {
      src: `${jointPainTreatmentSolutionsImageDir}/bg image.png`,
      alt: "Rheumatologist discussing joint pain treatment with a patient",
    },
    items: [
      {
        title: "Medication Management",
        description:
          "Personalized medications to reduce pain, control inflammation, and manage underlying conditions.",
        image: {
          src: jointPainTreatmentIcon(1),
          alt: "Medication management icon",
        },
      },
      {
        title: "Joint Injection Therapy",
        description:
          "Targeted injections that provide relief from pain and inflammation in affected joints.",
        image: {
          src: jointPainTreatmentIcon(2),
          alt: "Joint injection therapy icon",
        },
      },
      {
        title: "Physiotherapy & Rehabilitation",
        description:
          "Customized exercises and rehabilitation programs to improve strength, flexibility, and mobility.",
        image: {
          src: jointPainTreatmentIcon(3),
          alt: "Physiotherapy and rehabilitation icon",
        },
      },
      {
        title: "Lifestyle Modification",
        description:
          "Guidance on diet, exercise, weight management, and daily habits to support joint health.",
        image: {
          src: jointPainTreatmentIcon(4),
          alt: "Lifestyle modification icon",
        },
      },
      {
        title: "Autoimmune Disease Management",
        description:
          "Advanced treatment for autoimmune and rheumatic conditions to reduce flares and improve quality of life.",
        image: {
          src: jointPainTreatmentIcon(5),
          alt: "Autoimmune disease management icon",
        },
      },
      {
        title: "Long-Term Monitoring",
        description:
          "Ongoing follow-ups and monitoring to track progress and adjust treatment as needed.",
        image: {
          src: jointPainTreatmentIcon(6),
          alt: "Long-term monitoring icon",
        },
      },
    ],
  },
};
