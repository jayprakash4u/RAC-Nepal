import { siteConfig } from "@/config/site";

const conditionIconDir = "/images/conditionwetreat";

export type ConditionWeTreatItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: {
    src: string;
    alt: string;
  };
};

export const treatmentsSection = {
  eyebrow: "Our Specialties",
  title: "Conditions We Treat",
  description:
    "Comprehensive care for a wide range of joint, arthritis, and autoimmune conditions.",
  items: [
    {
      id: "rheumatoid-arthritis",
      title: "Rheumatoid Arthritis",
      description: "Chronic autoimmune joint inflammation.",
      href: "/conditions/rheumatoid-arthritis",
      icon: {
        src: `${conditionIconDir}/1.png`,
        alt: "Rheumatoid arthritis icon",
      },
    },
    {
      id: "osteoarthritis",
      title: "Osteoarthritis",
      description: "Degenerative joint condition causing pain and stiffness.",
      href: "/conditions/osteoarthritis",
      icon: {
        src: `${conditionIconDir}/2.png`,
        alt: "Osteoarthritis icon",
      },
    },
    {
      id: "gout",
      title: "Gout",
      description: "Sudden joint pain due to uric acid buildup.",
      href: "/conditions/gout",
      icon: {
        src: `${conditionIconDir}/3.png`,
        alt: "Gout icon",
      },
    },
    {
      id: "joint-pain",
      title: "Joint Pain",
      description: "Pain caused by injury, inflammation, or wear.",
      href: "/conditions/chronic-back-pain-joint-pain",
      icon: {
        src: `${conditionIconDir}/4.png`,
        alt: "Joint pain icon",
      },
    },
    {
      id: "osteoporosis",
      title: "Osteoporosis",
      description: "Weak and fragile bones increasing fracture risk.",
      href: "/conditions/osteoporosis",
      icon: {
        src: `${conditionIconDir}/5.png`,
        alt: "Osteoporosis icon",
      },
    },
    {
      id: "ankylosing-spondylitis",
      title: "Ankylosing Spondylitis",
      description: "Inflammation affecting spine and mobility.",
      href: "/conditions/ankylosing-spondylitis",
      icon: {
        src: `${conditionIconDir}/6.png`,
        alt: "Ankylosing spondylitis icon",
      },
    },
    {
      id: "psoriatic-arthritis",
      title: "Psoriatic Arthritis",
      description: "Joint pain associated with psoriasis.",
      href: "/conditions/psoriatic-arthritis",
      icon: {
        src: `${conditionIconDir}/7.png`,
        alt: "Psoriatic arthritis icon",
      },
    },
    {
      id: "autoimmune-disorders",
      title: "Autoimmune Disorders",
      description: "Conditions where the immune system attacks the body.",
      href: "/conditions/connective-tissue-diseases",
      icon: {
        src: `${conditionIconDir}/8.png`,
        alt: "Autoimmune disorders icon",
      },
    },
  ],
  primaryCta: {
    label: "View All Conditions",
    href: "/services/arthritis-management",
  },
  secondaryCta: {
    label: "Consult Specialist",
    href: "/services/rheumatology-consultation",
  },
} as const satisfies {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly ConditionWeTreatItem[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};
