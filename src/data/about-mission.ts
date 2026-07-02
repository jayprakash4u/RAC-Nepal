export type MissionItemKey = "mission" | "vision" | "goal";

export type MissionItem = {
  id: MissionItemKey;
  title: string;
  description: string;
};

const missionAssets = "/images/aboutpage/missionvission";

export const aboutMissionSection = {
  eyebrow: "Our Purpose",
  title: {
    prefix: "Our",
    highlight: "Mission",
  },
  description:
    "Every decision we make is guided by compassion, clinical excellence, and a long-term commitment to improving mobility and quality of life.",
  image: {
    src: `${missionAssets}/image4.jpg`,
    alt: "Medical illustration highlighting joint pain points across the body",
    objectPosition: "center",
  },
  items: [
    {
      id: "mission",
      title: "Mission",
      description:
        "To deliver evidence-based rheumatology services through skilled specialists, integrated diagnostics, and pharmacy support that puts patient wellbeing at the center of every decision.",
    },
    {
      id: "vision",
      title: "Vision",
      description:
        "To be Nepal's most trusted center for rheumatology and arthritis care — where every patient receives expert diagnosis, compassionate treatment, and a clear path to better mobility.",
    },
    {
      id: "goal",
      title: "Goal",
      description:
        "To improve long-term outcomes for people living with joint and autoimmune conditions through timely care, education, and continuous clinical excellence across our community.",
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: { prefix: string; highlight: string };
  description: string;
  image: { src: string; alt: string; objectPosition?: string };
  items: readonly MissionItem[];
};
