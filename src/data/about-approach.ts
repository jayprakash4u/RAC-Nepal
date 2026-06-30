const approachAssets = "/images/aboutpage/our approach";

export type AboutApproachItem = {
  id: string;
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
};

export const aboutApproachSection = {
  eyebrow: "Our Approach",
  title: {
    prefix: "Our Approach to",
    highlight: "Care",
  },
  description:
    "We combine medical expertise, advanced technology, and compassionate care to deliver the best outcomes for our patients.",
  items: [
    {
      id: "personalized-treatment",
      title: "Personalized Treatment",
      description:
        "Every patient receives a tailored care plan based on their condition.",
      icon: {
        src: `${approachAssets}/1.png`,
        alt: "Personalized treatment icon",
      },
    },
    {
      id: "accurate-diagnosis",
      title: "Accurate Diagnosis",
      description:
        "Advanced evaluation techniques to identify root causes.",
      icon: {
        src: `${approachAssets}/2.png`,
        alt: "Accurate diagnosis icon",
      },
    },
    {
      id: "long-term-management",
      title: "Long-Term Management",
      description:
        "Focused on sustained relief and improved quality of life.",
      icon: {
        src: `${approachAssets}/3.png`,
        alt: "Long-term management icon",
      },
    },
    {
      id: "patient-centered-care",
      title: "Patient-Centered Care",
      description:
        "Compassionate support at every stage of treatment.",
      icon: {
        src: `${approachAssets}/4.png`,
        alt: "Patient-centered care icon",
      },
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: { prefix: string; highlight: string };
  description: string;
  items: readonly AboutApproachItem[];
};
