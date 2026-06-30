import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const reactiveArthritisCondition: ConditionPageData = {
  slug: "reactive-arthritis",
  title: "Reactive Arthritis",
  image: {
    src: "/images/condition/Reactive Arthritis.png",
    alt: "Illustration of reactive arthritis affecting the joints",
  },
  meta: {
    title: "Reactive Arthritis",
    description: `Expert diagnosis and treatment for reactive arthritis at ${siteConfig.name} — post-infection joint inflammation care and specialist rheumatology support in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Reactive arthritis",
      },
      {
        type: "text",
        value:
          " is a form of inflammatory arthritis that can develop after certain infections, often affecting the joints, eyes, urinary tract, or skin. It commonly causes pain, swelling, and stiffness in the knees, ankles, feet, or lower back.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Most cases improve with appropriate treatment, but specialist care helps confirm the diagnosis and prevent complications. Management may include ",
      },
      {
        type: "strong",
        value: "anti-inflammatory medications, antibiotics when needed, guided physiotherapy, and close follow-up monitoring",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists assess joint inflammation in the context of recent infection and provide individualized treatment plans. If you develop joint pain, redness, or swelling after a gastrointestinal or urinary infection, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert reactive arthritis care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
