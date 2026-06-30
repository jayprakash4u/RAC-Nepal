import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const vasculitisCondition: ConditionPageData = {
  slug: "vasculitis",
  title: "Vasculitis",
  image: {
    src: "/images/condition/vasculitis.png",
    alt: "Illustration of vasculitis affecting blood vessels",
  },
  meta: {
    title: "Vasculitis",
    description: `Expert diagnosis and treatment for vasculitis at ${siteConfig.name} — autoimmune blood vessel inflammation care and specialist rheumatology support in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Vasculitis",
      },
      {
        type: "text",
        value:
          " refers to a group of conditions in which blood vessels become inflamed, which can reduce blood flow and damage affected organs. Symptoms vary widely and may include fever, fatigue, skin rashes, nerve pain, joint aches, or organ-related problems depending on the vessels involved.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Because vasculitis can be serious and sometimes life-threatening, early specialist diagnosis is essential. Treatment may include ",
      },
      {
        type: "strong",
        value:
          "immunosuppressive therapy, corticosteroids, close laboratory monitoring, and coordinated long-term follow-up",
      },
      {
        type: "text",
        value:
          " tailored to the specific type and severity of disease.",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists assess unexplained inflammation, organ involvement, and autoimmune features to guide timely treatment. If you have persistent fever, skin changes, nerve symptoms, or unexplained organ problems with inflammatory markers, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert vasculitis care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
