import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const osteoarthritisCondition: ConditionPageData = {
  slug: "osteoarthritis",
  title: "Osteoarthritis",
  image: {
    src: "/images/condition/Osteoarthritis.png",
    alt: "Illustration of osteoarthritis affecting the knee joint",
  },
  meta: {
    title: "Osteoarthritis",
    description: `Expert diagnosis and treatment for osteoarthritis at ${siteConfig.name} — joint pain relief, mobility support, and specialist rheumatology care in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Osteoarthritis",
      },
      {
        type: "text",
        value:
          " is the most common form of arthritis, caused by gradual wear and tear of cartilage in the joints. It typically leads to pain, stiffness, swelling, and reduced movement — most often in the knees, hips, hands, and spine.",
      },
    ],
    [
      {
        type: "text",
        value:
          "While osteoarthritis is progressive, early intervention can significantly ease symptoms and preserve function. Management may include ",
      },
      {
        type: "strong",
        value: "medications, physiotherapy, weight management, joint protection strategies, and guided exercise",
      },
      {
        type: "text",
        value:
          " tailored to each patient's needs and daily activities.",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists provide thorough evaluation, imaging review, and long-term care plans for osteoarthritis. If joint pain is limiting your movement or worsening over time, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert osteoarthritis care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
