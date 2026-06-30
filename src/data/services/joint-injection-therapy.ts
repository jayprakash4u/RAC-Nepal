import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const jointInjectionIntroImageDir = `${serviceScrollbarImageDir}/Joint Injection Therapy/intros`;
const jointInjectionConditionsImageDir = `${serviceScrollbarImageDir}/Joint Injection Therapy/conditions`;
const jointInjectionKneeJointImageDir = `${serviceScrollbarImageDir}/Joint Injection Therapy/knee joints`;

function jointInjectionIntroIcon(index: number) {
  return `${jointInjectionIntroImageDir}/icons${index}.png`;
}

function jointInjectionConditionIcon(index: number) {
  return `${jointInjectionConditionsImageDir}/${index}.png`;
}

function jointInjectionKneeIllustration(index: number) {
  return `${jointInjectionKneeJointImageDir}/${index}.png`;
}

function jointInjectionKneeIcon(index: number) {
  return `${jointInjectionKneeJointImageDir}/smallicons${index}.png`;
}

export const jointInjectionTherapyService: ServicePageData = {
  slug: "joint-injection-therapy",
  title: "Joint Injection Therapy",
  image: {
    src: `${serviceScrollbarImageDir}/Joint Injection Therapy.jpg`,
    alt: "Joint injection therapy at RAC Nepal",
  },
  meta: {
    title: "Joint Injection Therapy",
    description: `Joint injection therapy at ${siteConfig.name} — targeted treatment for joint pain and inflammation from specialist rheumatologists in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Joint injection therapy delivers targeted relief for painful, inflamed joints at RAC Nepal.",
      },
    ],
  ],
  overviewSection: {
    headerStyle: "accent-line",
    title: {
      prefix: "What is",
      highlight: "Joint Injection Therapy?",
    },
    description:
      "Joint injection therapy is a minimally invasive treatment used to relieve pain, reduce inflammation, and improve mobility in affected joints. It involves delivering medication directly into the joint for faster and more targeted relief.",
    secondaryDescription: `This therapy is commonly used for conditions like arthritis, gout, and joint inflammation, helping patients regain comfort and function without the need for surgery. At ${siteConfig.shortName}, injections are performed after careful clinical assessment to ensure they are appropriate and safe.`,
    features: [
      {
        title: "Targeted Pain Relief",
        description:
          "Delivers medication directly into the joint to provide fast and effective pain relief.",
        image: {
          src: jointInjectionIntroIcon(1),
          alt: "Targeted pain relief icon",
        },
      },
      {
        title: "Reduced Inflammation",
        description:
          "Helps decrease swelling and stiffness, improving joint comfort and flexibility.",
        image: {
          src: jointInjectionIntroIcon(2),
          alt: "Reduced inflammation icon",
        },
      },
      {
        title: "Improved Mobility",
        description:
          "Enhances joint movement, making daily activities easier and more comfortable.",
        image: {
          src: jointInjectionIntroIcon(3),
          alt: "Improved mobility icon",
        },
      },
      {
        title: "Minimally Invasive",
        description:
          "A quick, safe procedure with minimal downtime and faster recovery.",
        image: {
          src: jointInjectionIntroIcon(4),
          alt: "Minimally invasive icon",
        },
      },
    ],
    sideImage: {
      src: `${jointInjectionIntroImageDir}/side image.jpg`,
      alt: "Doctor administering a joint injection to a patient's knee",
    },
    imagePosition: "left",
    featureListStyle: "divided",
    background: "default",
    layout: "editorial",
  },
  servicesWeProvideSection: {
    title: {
      prefix: "Conditions",
      highlight: "We Treat",
    },
    titleInline: true,
    headerAlign: "center",
    gridColumns: 3,
    items: [
      {
        title: "Osteoarthritis",
        description: "Wear-and-tear of cartilage causing pain and stiffness.",
        icon: {
          src: jointInjectionConditionIcon(1),
          alt: "Osteoarthritis icon",
        },
      },
      {
        title: "Rheumatoid Arthritis",
        description:
          "Autoimmune condition causing joint pain, swelling, and stiffness.",
        icon: {
          src: jointInjectionConditionIcon(2),
          alt: "Rheumatoid arthritis icon",
        },
      },
      {
        title: "Gout-related Joint Pain",
        description:
          "Painful inflammation caused by uric acid crystal buildup.",
        icon: {
          src: jointInjectionConditionIcon(3),
          alt: "Gout-related joint pain icon",
        },
      },
      {
        title: "Bursitis",
        description:
          "Inflammation of the fluid-filled sacs that cushion the joints.",
        icon: {
          src: jointInjectionConditionIcon(4),
          alt: "Bursitis icon",
        },
      },
      {
        title: "Tendinitis",
        description:
          "Inflammation or irritation of tendons causing pain and tenderness.",
        icon: {
          src: jointInjectionConditionIcon(5),
          alt: "Tendinitis icon",
        },
      },
      {
        title: "Joint Inflammation",
        description:
          "Swelling and irritation of joints due to injury or underlying conditions.",
        icon: {
          src: jointInjectionConditionIcon(6),
          alt: "Joint inflammation icon",
        },
      },
    ],
  },
  injectionTypesSection: {
    title: {
      prefix: "Types of",
      highlight: "Joint",
      suffix: "Injections",
    },
    items: [
      {
        title: "Corticosteroid Injections",
        description: "Reduce inflammation and provide rapid pain relief.",
        illustration: {
          src: jointInjectionKneeIllustration(1),
          alt: "Corticosteroid knee injection illustration",
        },
        icon: {
          src: jointInjectionKneeIcon(1),
          alt: "Corticosteroid injection icon",
        },
      },
      {
        title: "Hyaluronic Acid Injections",
        description: "Improve joint lubrication and cushioning.",
        illustration: {
          src: jointInjectionKneeIllustration(2),
          alt: "Hyaluronic acid knee injection illustration",
        },
        icon: {
          src: jointInjectionKneeIcon(2),
          alt: "Hyaluronic acid injection icon",
        },
      },
      {
        title: "Platelet-Rich Plasma (PRP)",
        description:
          "Promotes healing using the body's natural growth factors.",
        illustration: {
          src: jointInjectionKneeIllustration(3),
          alt: "Platelet-rich plasma knee injection illustration",
        },
        icon: {
          src: jointInjectionKneeIcon(3),
          alt: "Platelet-rich plasma injection icon",
        },
      },
    ],
  },
};
