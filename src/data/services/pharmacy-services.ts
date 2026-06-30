import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const pharmacyIntroImageDir = `${serviceScrollbarImageDir}/pharmacy managment/intros`;
const pharmacyServicesImageDir = `${serviceScrollbarImageDir}/pharmacy managment/services`;
const pharmacySupportImage = `${serviceScrollbarImageDir}/pharmacy managment/supportimage.png`;

function pharmacyIntroIcon(index: number) {
  return `${pharmacyIntroImageDir}/icons${index}.png`;
}

function pharmacyServiceIcon(index: number) {
  return `${pharmacyServicesImageDir}/icons${index}.png`;
}

export const pharmacyServicesService: ServicePageData = {
  slug: "pharmacy-services",
  title: "Pharmacy Services",
  image: {
    src: `${serviceScrollbarImageDir}/Pharmacy Services.jpg`,
    alt: "Pharmacy services at RAC Nepal",
  },
  meta: {
    title: "Pharmacy Services",
    description: `Pharmacy services at ${siteConfig.name} — DMARDs, biologics, and rheumatology prescription support on-site in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Pharmacy management focuses on safe, accurate medication handling for rheumatology patients at RAC Nepal.",
      },
    ],
  ],
  overviewSection: {
    headerStyle: "accent-line",
    title: {
      prefix: "What is",
      highlight: "Pharmacy Management?",
    },
    description:
      "Pharmacy Management focuses on the safe, accurate, and efficient handling of medications. It includes reviewing prescriptions, dispensing medicines, and ensuring patients understand how to take them correctly.",
    secondaryDescription: `For patients with chronic conditions, proper pharmacy management is essential to maintain treatment effectiveness and minimize side effects. At ${siteConfig.shortName}, our pharmacy team works alongside rheumatologists to support your care.`,
    features: [
      {
        title: "Prescription Accuracy",
        description:
          "Ensure every medication is reviewed and dispensed correctly to avoid errors and ensure patient safety.",
        image: {
          src: pharmacyIntroIcon(2),
          alt: "Prescription accuracy icon",
        },
      },
      {
        title: "Medication Guidance",
        description:
          "Provide clear instructions on dosage, timing, and usage to help patients take medications effectively.",
        image: {
          src: pharmacyIntroIcon(3),
          alt: "Medication guidance icon",
        },
      },
      {
        title: "Safety Monitoring",
        description:
          "Track drug interactions and side effects to prevent complications and ensure safe treatment.",
        image: {
          src: pharmacyIntroIcon(4),
          alt: "Safety monitoring icon",
        },
      },
      {
        title: "Ongoing Support",
        description:
          "Assist patients with refills, adherence, and long-term medication management for better health outcomes.",
        image: {
          src: pharmacyIntroIcon(5),
          alt: "Ongoing support icon",
        },
      },
    ],
    sideImage: {
      src: `${pharmacyIntroImageDir}/side image.png`,
      alt: "Pharmacist handing medication to a patient at RAC Nepal",
    },
    imagePosition: "left",
    featureListStyle: "divided",
    background: "default",
    layout: "editorial",
  },
  servicesWeProvideSection: {
    title: {
      prefix: "Our",
      highlight: "Pharmacy",
      suffix: "Services",
    },
    headerAlign: "center",
    gridColumns: 3,
    items: [
      {
        title: "Prescription Management",
        description: "Accurate review and management of your prescriptions.",
        icon: {
          src: pharmacyServiceIcon(1),
          alt: "Prescription management icon",
        },
      },
      {
        title: "Medication Counseling",
        description:
          "Personalized guidance on correct medication use and best practices.",
        icon: {
          src: pharmacyServiceIcon(2),
          alt: "Medication counseling icon",
        },
      },
      {
        title: "Drug Interaction Monitoring",
        description:
          "Check and monitor potential drug interactions for your safety.",
        icon: {
          src: pharmacyServiceIcon(3),
          alt: "Drug interaction monitoring icon",
        },
      },
      {
        title: "Chronic Disease Medication Support",
        description:
          "Ongoing support for chronic condition management and better outcomes.",
        icon: {
          src: pharmacyServiceIcon(4),
          alt: "Chronic disease medication support icon",
        },
      },
      {
        title: "Refill & Reminder Services",
        description: "Timely refills and reminders to help you stay on track.",
        icon: {
          src: pharmacyServiceIcon(5),
          alt: "Refill and reminder services icon",
        },
      },
      {
        title: "Safe Dispensing Practices",
        description:
          "Ensuring the right medication, right dose, and right instructions.",
        icon: {
          src: pharmacyServiceIcon(6),
          alt: "Safe dispensing practices icon",
        },
      },
    ],
  },
  supportCtaSection: {
    title: {
      prefix: "Get Expert",
      highlight: "Pharmacy Support",
      suffix: "Today",
    },
    description:
      "Our pharmacists are here to ensure your medications are safe, effective, and right for you.",
    primaryCta: {
      label: "Book Consultation",
      href: siteConfig.links.appointment,
    },
    secondaryCta: {
      label: "Contact Pharmacy",
      href: "/contact",
    },
    image: {
      src: pharmacySupportImage,
      alt: "Pharmacy bag, medicine bottles, and capsules",
    },
  },
};
