import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const softTissueRheumatismCondition: ConditionPageData = {
  slug: "soft-tissue-rheumatism",
  title: "Soft Tissue Rheumatism (Tendon & Muscle Disorders)",
  image: {
    src: "/images/condition/soft-tissue-rheumatism.png",
    alt: "Illustration of soft tissue rheumatism affecting tendons and muscles",
  },
  meta: {
    title: "Soft Tissue Rheumatism (Tendon & Muscle Disorders)",
    description: `Expert diagnosis and treatment for soft tissue rheumatism at ${siteConfig.name} — tendon, muscle, and soft tissue pain care from specialist rheumatologists in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Soft tissue rheumatism",
      },
      {
        type: "text",
        value:
          " refers to painful conditions affecting tendons, muscles, ligaments, and surrounding soft tissues rather than the joints themselves. Common examples include tendonitis, bursitis, and regional pain syndromes that cause localized pain, stiffness, and reduced movement.",
      },
    ],
    [
      {
        type: "text",
        value:
          "These conditions are often related to overuse, injury, posture, or inflammatory changes in soft tissues. Specialist assessment helps distinguish soft tissue problems from joint arthritis and guides effective treatment with ",
      },
      {
        type: "strong",
        value:
          "anti-inflammatory care, physiotherapy, activity modification, injection therapy when needed, and rehabilitation planning",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists evaluate persistent tendon and muscle pain with a focus on restoring function and preventing recurrence. If you have ongoing shoulder, elbow, hip, knee, or heel pain linked to movement or repetitive strain, `,
      },
      {
        type: "strong",
        value:
          "book a consultation for expert soft tissue rheumatism care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
