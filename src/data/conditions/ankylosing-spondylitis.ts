import { siteConfig } from "@/config/site";
import type { ConditionPageData } from "@/types/condition-content";

export const ankylosingSpondylitisCondition: ConditionPageData = {
  slug: "ankylosing-spondylitis",
  title: "Ankylosing Spondylitis",
  image: {
    src: "/images/condition/Ankylosing Spondylitis.png",
    alt: "Illustration of ankylosing spondylitis affecting the spine",
  },
  meta: {
    title: "Ankylosing Spondylitis",
    description: `Expert diagnosis and treatment for ankylosing spondylitis at ${siteConfig.name} — spinal inflammation care, mobility support, and specialist rheumatology treatment in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "strong",
        value: "Ankylosing spondylitis",
      },
      {
        type: "text",
        value:
          " is a chronic inflammatory arthritis that primarily affects the spine and sacroiliac joints, causing back pain and stiffness. Over time, inflammation can reduce spinal flexibility and may also involve the hips, shoulders, and other joints.",
      },
    ],
    [
      {
        type: "text",
        value:
          "Early diagnosis and treatment are key to controlling inflammation and preserving mobility. Management often includes ",
      },
      {
        type: "strong",
        value: "anti-inflammatory therapy, biologic medications when indicated, structured exercise, and posture support",
      },
      {
        type: "text",
        value: ".",
      },
    ],
    [
      {
        type: "text",
        value: `At ${siteConfig.shortName}, our rheumatologists evaluate back pain patterns, imaging findings, and inflammatory markers to diagnose and treat ankylosing spondylitis effectively. If you have chronic lower back stiffness, especially in the morning, or pain that improves with activity, `,
      },
      {
        type: "strong",
        value: "book a consultation for expert ankylosing spondylitis care in Nepal",
      },
      {
        type: "text",
        value: ".",
      },
    ],
  ],
};
