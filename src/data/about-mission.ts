export type MissionItemKey = "vision" | "missions" | "goals";

export type MissionItem = {
  id: MissionItemKey;
  title: string;
  description: string;
};

export type MissionGallerySlot = {
  id: "top" | "left" | "bottom" | "right";
  alt: string;
  src: string;
  size: "sm" | "lg";
  objectPosition?: string;
  imageScale?: number;
};

const missionAssets = "/images/aboutpage/missionvission";

export const aboutMissionSection = {
  eyebrow: "Our Purpose",
  title: {
    prefix: "Our",
    highlight: "Mission",
  },
  items: [
    {
      id: "vision",
      title: "Vision",
      description:
        "To be Nepal's most trusted center for rheumatology and arthritis care — where every patient receives expert diagnosis, compassionate treatment, and a clear path to better mobility.",
    },
    {
      id: "missions",
      title: "Missions",
      description:
        "To deliver evidence-based rheumatology services through skilled specialists, integrated diagnostics, and pharmacy support that puts patient wellbeing at the center of every decision.",
    },
    {
      id: "goals",
      title: "Goals",
      description:
        "To improve long-term outcomes for people living with joint and autoimmune conditions through timely care, education, and continuous clinical excellence across our community.",
    },
  ],
  gallery: [
    {
      id: "top",
      src: `${missionAssets}/image3.jpg`,
      alt: "Doctor providing compassionate rheumatology care",
      size: "sm",
      objectPosition: "50% 12%",
      imageScale: 1.42,
    },
    {
      id: "left",
      src: `${missionAssets}/image4.jpg`,
      alt: "Medical illustration highlighting joint pain points",
      size: "sm",
      objectPosition: "50% 50%",
      imageScale: 1.42,
    },
    {
      id: "bottom",
      src: `${missionAssets}/image1.jpg`,
      alt: "Active elderly couple enjoying life outdoors",
      size: "sm",
      objectPosition: "50% 28%",
      imageScale: 1.42,
    },
    {
      id: "right",
      src: `${missionAssets}/image2.jpg`,
      alt: "Woman running on a mountain trail at sunrise",
      size: "lg",
      objectPosition: "58% 32%",
      imageScale: 1.38,
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: { prefix: string; highlight: string };
  items: readonly MissionItem[];
  gallery: readonly MissionGallerySlot[];
};
