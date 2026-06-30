import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const rheumatoidArthritisCondition: ConditionPageData = {
  slug: "rheumatoid-arthritis",
  title: "Rheumatoid Arthritis",
  image: {
    src: "/images/condition/Rheumatoid Arthritis.png",
    alt: "Illustration of rheumatoid arthritis affecting the hand joints",
  },
  meta: {
    title: "Rheumatoid Arthritis",
    description: `Expert diagnosis and treatment for rheumatoid arthritis at ${siteConfig.name} — early intervention, DMARD therapy, and specialist rheumatology care in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Rheumatoid arthritis",
      },
      {
        type: "text",
        value:
          " is a chronic autoimmune disease in which the immune system attacks the lining of the joints, causing pain, swelling, and stiffness. It often affects the hands, wrists, and feet symmetrically and can progress to joint damage if not treated early.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Modern rheumatology care focuses on controlling inflammation quickly to protect joints and maintain daily function. Treatment may include ",
      },
      {
        type: "strong",
        value: "disease-modifying antirheumatic drugs (DMARDs), biologic therapy, monitoring blood tests, and structured follow-up care",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists specialize in diagnosing rheumatoid arthritis early and building individualized long-term treatment plans. If you have persistent joint swelling, morning stiffness lasting more than 30 minutes, or a family history of autoimmune arthritis, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert rheumatoid arthritis care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
