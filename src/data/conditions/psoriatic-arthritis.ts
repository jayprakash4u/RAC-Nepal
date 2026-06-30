import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const psoriaticArthritisCondition: ConditionPageData = {
  slug: "psoriatic-arthritis",
  title: "Psoriatic Arthritis",
  image: {
    src: "/images/condition/Psoriatic Arthritis.png",
    alt: "Illustration of psoriatic arthritis affecting the joints and skin",
  },
  meta: {
    title: "Psoriatic Arthritis",
    description: `Expert diagnosis and treatment for psoriatic arthritis at ${siteConfig.name} — joint and skin symptom management, and specialist rheumatology care in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Psoriatic arthritis",
      },
      {
        type: "text",
        value:
          " is a chronic inflammatory condition that affects some people with psoriasis, causing joint pain, stiffness, and swelling. It can involve the fingers, toes, spine, and other joints, and symptoms may flare unpredictably over time.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Early diagnosis is important to prevent lasting joint damage and to manage skin symptoms together with joint inflammation. Treatment plans often combine ",
      },
      {
        type: "strong",
        value: "disease-modifying therapy, pain control, physiotherapy, and coordinated skin and joint care",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists evaluate psoriatic arthritis with a whole-patient approach — addressing joint inflammation, function, and quality of life. If you have psoriasis with persistent joint pain or morning stiffness, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert psoriatic arthritis care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
