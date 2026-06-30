import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const sjogrensSyndromeCondition: ConditionPageData = {
  slug: "sjogrens-syndrome",
  title: "Sjögren's Syndrome",
  image: {
    src: "/images/condition/sjogrens-syndrome.png",
    alt: "Illustration of Sjögren's syndrome affecting moisture-producing glands",
  },
  meta: {
    title: "Sjögren's Syndrome",
    description: `Expert diagnosis and treatment for Sjögren's syndrome at ${siteConfig.name} — autoimmune dryness, joint pain care, and specialist rheumatology support in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Sjögren's syndrome",
      },
      {
        type: "text",
        value:
          " is an autoimmune condition in which the immune system attacks moisture-producing glands, leading to dry eyes and dry mouth. It can also cause joint pain, fatigue, and swelling in glands around the face and neck.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Because symptoms can overlap with other conditions, specialist rheumatology assessment is important for accurate diagnosis and long-term care. Treatment focuses on relieving dryness, controlling inflammation, and protecting organs through ",
      },
      {
        type: "strong",
        value:
          "personalized medications, symptom management, regular monitoring, and coordinated follow-up",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists evaluate persistent dryness, joint symptoms, and related autoimmune features to build individualized treatment plans. If you have ongoing dry eyes or mouth with joint pain, fatigue, or gland swelling, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert Sjögren's syndrome care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
