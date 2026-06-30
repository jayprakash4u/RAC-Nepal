import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const goutCondition: ConditionPageData = {
  slug: "gout",
  title: "Gout",
  image: {
    src: "/images/condition/Gout.png",
    alt: "Illustration of gout affecting the foot and joint",
  },
  meta: {
    title: "Gout",
    description: `Expert diagnosis and treatment for gout at ${siteConfig.name} — uric acid management, flare prevention, and specialist rheumatology care in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Gout",
      },
      {
        type: "text",
        value:
          " is a common form of inflammatory arthritis caused by elevated uric acid in the blood, which can form sharp crystals in joints and surrounding tissues. It often presents as sudden, intense pain, swelling, and redness — frequently in the big toe, ankle, or knee.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Without proper treatment, gout can become recurrent and lead to chronic joint damage. Early specialist care helps control flares, lower uric acid safely, and protect long-term joint health through ",
      },
      {
        type: "strong",
        value: "personalized medication and lifestyle guidance",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists provide comprehensive assessment, laboratory testing, and ongoing management for gout — from acute flare treatment to long-term uric acid control. If you experience repeated joint pain or have been diagnosed with high uric acid, `,
      },
      {
        type: "strong",
        value: `book a consultation for expert gout care in Nepal`,
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
