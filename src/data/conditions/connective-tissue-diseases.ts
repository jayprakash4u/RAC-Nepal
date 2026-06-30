import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const connectiveTissueDiseasesCondition: ConditionPageData = {
  slug: "connective-tissue-diseases",
  title: "Connective Tissue Diseases",
  image: {
    src: "/images/condition/connective-tissue-diseases.png",
    alt: "Illustration of connective tissue disease affecting joints and soft tissues",
  },
  meta: {
    title: "Connective Tissue Diseases",
    description: `Expert diagnosis and treatment for connective tissue diseases at ${siteConfig.name} — autoimmune and inflammatory disorder care from specialist rheumatologists in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Connective tissue diseases",
      },
      {
        type: "text",
        value:
          " are a group of autoimmune and inflammatory disorders that affect the tissues supporting joints, skin, blood vessels, and internal organs. Examples include conditions such as lupus, scleroderma, and mixed connective tissue disease, which can cause joint pain, skin changes, fatigue, and organ involvement.",
      },
    ],
    [
      {
        type: "text",
        value:
          "These conditions often present with overlapping symptoms, so specialist rheumatology evaluation is important for accurate diagnosis and safe long-term management. Treatment may include ",
      },
      {
        type: "strong",
        value:
          "immunosuppressive therapy, anti-inflammatory medications, organ monitoring, and individualized follow-up care",
      },
      {
        type: "text",
        value:
          " based on disease activity and complications.",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists provide comprehensive assessment and coordinated care for complex autoimmune connective tissue disorders. If you have persistent joint and skin symptoms, Raynaud's phenomenon, unexplained fatigue, or multi-organ involvement, `,
      },
      {
        type: "strong",
        value:
          "book a consultation for expert connective tissue disease care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
