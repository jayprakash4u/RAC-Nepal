import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const juvenileIdiopathicArthritisCondition: ConditionPageData = {
  slug: "juvenile-idiopathic-arthritis",
  title: "Juvenile Idiopathic Arthritis (Children's Arthritis)",
  image: {
    src: "/images/condition/Juvenile Idiopathic Arthritis (Children's Arthritis).png",
    alt: "Illustration of juvenile idiopathic arthritis affecting a child's joints",
  },
  meta: {
    title: "Juvenile Idiopathic Arthritis (Children's Arthritis)",
    description: `Expert diagnosis and treatment for juvenile idiopathic arthritis at ${siteConfig.name} — specialized pediatric rheumatology care for children with arthritis in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Juvenile idiopathic arthritis (JIA)",
      },
      {
        type: "text",
        value:
          ", also known as children's arthritis, is a group of chronic inflammatory joint conditions that begin before the age of 16. It can cause joint pain, swelling, stiffness, and reduced mobility, and may affect growth and daily activities if not treated early.",
      },
    ],
    [
      {
        type: "text",
        value:
          "JIA includes several subtypes, and specialist assessment is important to identify the correct form and plan safe long-term care. Treatment may include ",
      },
      {
        type: "strong",
        value:
          "anti-inflammatory medications, disease-modifying therapy, physiotherapy, regular monitoring, and family-centered follow-up",
      },
      {
        type: "text",
        value:
          " to control inflammation, protect joints, and support healthy development.",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists provide compassionate, expert care for children with arthritis and work closely with families to manage symptoms and improve quality of life. If your child has persistent joint swelling, morning stiffness, limping, or unexplained fever with rash, `,
      },
      {
        type: "strong",
        value:
          "book a consultation for expert juvenile idiopathic arthritis care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
