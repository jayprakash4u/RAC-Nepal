import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const chronicBackPainJointPainCondition: ConditionPageData = {
  slug: "chronic-back-pain-joint-pain",
  title: "Chronic Back Pain & Joint Pain",
  image: {
    src: "/images/condition/chronic-back-pain-joint-pain.png",
    alt: "Illustration of chronic back pain and joint pain",
  },
  meta: {
    title: "Chronic Back Pain & Joint Pain",
    description: `Expert diagnosis and treatment for chronic back pain and joint pain at ${siteConfig.name} — specialist rheumatology assessment and personalized care in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Chronic back pain and joint pain",
      },
      {
        type: "text",
        value:
          " are common problems that can significantly affect mobility, sleep, work, and quality of life. Pain may arise from arthritis, spinal inflammation, mechanical strain, nerve involvement, or other rheumatologic and musculoskeletal conditions.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Because long-standing pain has many possible causes, specialist assessment helps identify the underlying condition and avoid unnecessary delays in treatment. Care may include ",
      },
      {
        type: "strong",
        value:
          "targeted medications, physiotherapy, lifestyle guidance, injection therapy when appropriate, and structured follow-up",
      },
      {
        type: "text",
        value:
          " to reduce pain and restore function.",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists evaluate persistent back and joint symptoms with a focus on inflammatory, autoimmune, and mechanical causes. If you have ongoing pain lasting more than a few weeks, morning stiffness, swelling, or pain that limits daily activities, `,
      },
      {
        type: "strong",
        value:
          "book a consultation for expert chronic back pain and joint pain care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
