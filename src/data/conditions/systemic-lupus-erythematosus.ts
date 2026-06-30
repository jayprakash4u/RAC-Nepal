import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const systemicLupusErythematosusCondition: ConditionPageData = {
  slug: "systemic-lupus-erythematosus",
  title: "Systemic Lupus Erythematosus (SLE)",
  image: {
    src: "/images/condition/Systemic Lupus Erythematosus (SLE).png",
    alt: "Illustration representing systemic lupus erythematosus (SLE)",
  },
  meta: {
    title: "Systemic Lupus Erythematosus (SLE)",
    description: `Expert diagnosis and treatment for systemic lupus erythematosus (SLE) at ${siteConfig.name} — autoimmune care, flare management, and specialist rheumatology support in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Systemic lupus erythematosus (SLE)",
      },
      {
        type: "text",
        value:
          " is a chronic autoimmune disease in which the immune system can affect multiple parts of the body, including the joints, skin, kidneys, blood cells, and other organs. Symptoms vary widely and may include joint pain, fatigue, rashes, fever, and sensitivity to sunlight.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Because lupus can mimic other conditions, specialist evaluation is essential for accurate diagnosis and safe treatment. Care plans often involve ",
      },
      {
        type: "strong",
        value: "immunosuppressive therapy, regular laboratory monitoring, flare prevention, and coordinated long-term follow-up",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists provide comprehensive assessment and ongoing management for SLE, helping patients control disease activity and protect organ health. If you have unexplained joint pain, facial rash, persistent fatigue, or a prior positive ANA test, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert lupus care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
