const journeyImageDir = "/images/home journery";

function journeyIcon(index: number) {
  return `${journeyImageDir}/${index}.png`;
}

export type JourneyStage = {
  step: string;
  label: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
};

export const journeySection = {
  stages: [
    {
      step: "01",
      label: "Diagnosis",
      description: "Precise identification of your condition",
      icon: {
        src: journeyIcon(1),
        alt: "Patient on a hospital bed — diagnosis stage",
      },
    },
    {
      step: "02",
      label: "Treatment Plan",
      description: "Personalized therapy tailored to you",
      icon: {
        src: journeyIcon(2),
        alt: "Patient in a wheelchair — treatment planning stage",
      },
    },
    {
      step: "03",
      label: "Assisted Mobility",
      description: "Supportive care to restore independence",
      icon: {
        src: journeyIcon(3),
        alt: "Patient using a walker — assisted mobility stage",
      },
    },
    {
      step: "04",
      label: "Active Recovery",
      description: "Guided rehabilitation and physiotherapy",
      icon: {
        src: journeyIcon(4),
        alt: "Patient walking — active recovery stage",
      },
    },
    {
      step: "05",
      label: "Restored Motion",
      description: "Returning to normal daily activities",
      icon: {
        src: journeyIcon(5),
        alt: "Patient running — restored motion stage",
      },
    },
    {
      step: "06",
      label: "Full Freedom",
      description: "Living pain-free with confidence",
      icon: {
        src: journeyIcon(6),
        alt: "Patient jumping — full freedom stage",
      },
    },
  ],
} as const satisfies {
  stages: readonly JourneyStage[];
};
