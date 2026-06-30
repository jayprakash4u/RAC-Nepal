import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const osteoporosisCondition: ConditionPageData = {
  slug: "osteoporosis",
  title: "Osteoporosis",
  image: {
    src: "/images/condition/osteoporosis.png",
    alt: "Illustration of osteoporosis affecting bone strength and structure",
  },
  meta: {
    title: "Osteoporosis",
    description: `Expert diagnosis and treatment for osteoporosis at ${siteConfig.name} — bone health assessment, fracture prevention, and specialist rheumatology care in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Osteoporosis",
      },
      {
        type: "text",
        value:
          " is a condition in which bones become weaker and more fragile, increasing the risk of fractures — especially in the spine, hip, and wrist. It often develops gradually and may go unnoticed until a fracture occurs.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Specialist assessment helps identify bone loss early and reduce future fracture risk. Management may include ",
      },
      {
        type: "strong",
        value:
          "bone density testing, calcium and vitamin D guidance, lifestyle modification, and medications to strengthen bone",
      },
      {
        type: "text",
        value:
          ", tailored to each patient's age, risk factors, and overall health.",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists evaluate bone health and provide individualized plans to protect mobility and independence. If you have risk factors such as postmenopausal age, long-term steroid use, previous fractures, or a family history of osteoporosis, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert osteoporosis care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
