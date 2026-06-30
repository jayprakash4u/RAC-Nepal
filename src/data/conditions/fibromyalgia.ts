import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const fibromyalgiaCondition: ConditionPageData = {
  slug: "fibromyalgia",
  title: "Fibromyalgia",
  image: {
    src: "/images/condition/fibromyalgia.png",
    alt: "Illustration representing fibromyalgia and widespread body pain",
  },
  meta: {
    title: "Fibromyalgia",
    description: `Expert diagnosis and treatment for fibromyalgia at ${siteConfig.name} — chronic pain management, fatigue care, and specialist rheumatology support in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Fibromyalgia",
      },
      {
        type: "text",
        value:
          " is a chronic condition characterized by widespread musculoskeletal pain, fatigue, sleep disturbances, and heightened sensitivity to touch. Symptoms can vary from day to day and often affect quality of life, mood, and daily activities.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Because fibromyalgia can overlap with other rheumatologic and medical conditions, accurate assessment is essential. Treatment focuses on relieving symptoms and improving function through ",
      },
      {
        type: "strong",
        value: "a tailored combination of medication, physical activity, sleep support, and stress management",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatology team works closely with patients to diagnose fibromyalgia carefully, rule out other causes of pain, and build a long-term care plan. If you have persistent body pain, stiffness, or unrefreshing sleep, `,
      },
      {
        type: "strong",
        value: "schedule a consultation for specialist fibromyalgia care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
