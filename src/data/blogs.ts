export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
  };
};

export const blogPage = {
  eyebrow: "Our Blog",
  title: "Health Insights &",
  titleAccent: "Expert Articles",
  description:
    "Evidence-based perspectives on arthritis, rheumatology, and living well — written by the specialists at RAC Nepal for patients and families across Nepal.",
  cta: {
    label: "Book a Consultation",
    href: "/contact",
  },
} as const;

export const blogPosts: readonly BlogPost[] = [
  {
    id: "world-arthritis-day-2024",
    slug: "world-arthritis-day-2024-informed-choices-better-outcomes",
    title: "World Arthritis Day 2024: Informed Choices, Better Outcomes",
    excerpt:
      "How informed decisions about diagnosis, treatment, and daily habits can improve long-term outcomes for people living with arthritis in Nepal.",
    category: "Awareness",
    publishedAt: "2024-10-12",
    readTime: "5 min read",
    image: {
      src: "/images/Gallery/RacNepal-10-scaled.jpg",
      alt: "RAC Nepal team at World Arthritis Day awareness event",
    },
  },
  {
    id: "expert-arthritis-care-kathmandu",
    slug: "expert-arthritis-care-kathmandu-rheumatologists-rac-nepal",
    title:
      "Expert Arthritis Care in Kathmandu: Meet the Rheumatologists at RAC NEPAL",
    excerpt:
      "An introduction to the rheumatology team at RAC Nepal and the specialist care available for arthritis patients in Kathmandu.",
    category: "Our Team",
    publishedAt: "2024-08-22",
    readTime: "6 min read",
    image: {
      src: "/images/Gallery/RacNepal-14-scaled.jpg",
      alt: "Rheumatologists at RAC Nepal clinic",
    },
  },
  {
    id: "knee-pain-relief-nepal",
    slug: "unlocking-knee-pain-relief-expert-tips-nepal",
    title:
      "Unlocking the Secrets of Knee Pain Relief: Expert Tips for Nepal Residents",
    excerpt:
      "Practical, clinician-backed guidance on managing knee pain — from early symptoms to when to seek specialist rheumatology care.",
    category: "Patient Tips",
    publishedAt: "2024-06-15",
    readTime: "7 min read",
    image: {
      src: "/images/joints/3.jpg",
      alt: "Knee joint illustration for pain relief guidance",
    },
  },
  {
    id: "rheumatoid-arthritis-treatment-nepal",
    slug: "rheumatoid-arthritis-treatment-nepal-expert-care",
    title: "Rheumatoid Arthritis Treatment Nepal | Expert Care in Nepal",
    excerpt:
      "Understanding modern rheumatoid arthritis treatment options, monitoring, and the importance of early specialist intervention in Nepal.",
    category: "Conditions",
    publishedAt: "2024-04-03",
    readTime: "8 min read",
    image: {
      src: "/images/condition/Rheumatoid Arthritis.png",
      alt: "Rheumatoid arthritis condition overview",
    },
  },
  {
    id: "gathiya-baat-tips-nepali",
    slug: "gathiya-baat-rog-prakop-aradmayi-jeevan-tips",
    title:
      "गठिया (बात) रोगको प्रकोपबाट कसरि लड्ने : अधिक आरामपूर्ण जीवनका लागि टिप्स हरु",
    excerpt:
      "गठिया र बात रोगसँग दैनिक जीवन सहज बनाउनका लागि विशेषज्ञ सुझावहरू — व्यायाम, औषधि, र जीवनशैली सम्बन्धी व्यावहारिक मार्गदर्शन।",
    category: "नेपाली",
    publishedAt: "2024-02-18",
    readTime: "6 min read",
    image: {
      src: "/images/Gallery/RacNepal-6-scaled.jpg",
      alt: "गठिया रोगका लागि जीवनशैली टिप्स",
    },
  },
  {
    id: "gout-flare-prevention-nepal",
    slug: "gout-flare-prevention-nepal-diet-lifestyle",
    title: "Gout Flare Prevention in Nepal: Diet, Hydration, and When to Seek Care",
    excerpt:
      "How diet, alcohol, dehydration, and seasonal habits in Nepal can trigger gout — plus practical steps to reduce flares and protect your joints.",
    category: "Gout",
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    image: {
      src: "/images/condition/Gout.png",
      alt: "Gout management and flare prevention",
    },
  },
  {
    id: "osteoporosis-bone-health-nepal",
    slug: "osteoporosis-bone-health-nepal-after-50",
    title: "Osteoporosis in Nepal: Why Bone Health Matters After 50",
    excerpt:
      "Fragility fractures are often preventable. Learn screening, calcium and vitamin D guidance, and treatment options available at RAC Nepal.",
    category: "Conditions",
    publishedAt: "2023-11-28",
    readTime: "7 min read",
    image: {
      src: "/images/condition/osteoporosis.png",
      alt: "Osteoporosis and bone health education",
    },
  },
  {
    id: "lupus-early-signs-kathmandu",
    slug: "living-with-lupus-early-signs-specialist-care-kathmandu",
    title: "Living with Lupus: Early Signs and Specialist Care in Kathmandu",
    excerpt:
      "Fatigue, joint pain, and skin changes can overlap with other conditions. When to suspect lupus and why rheumatology referral matters.",
    category: "Autoimmune",
    publishedAt: "2023-10-05",
    readTime: "8 min read",
    image: {
      src: "/images/condition/Systemic Lupus Erythematosus (SLE).png",
      alt: "Systemic lupus erythematosus awareness",
    },
  },
  {
    id: "physiotherapy-arthritis-exercises",
    slug: "physiotherapy-arthritis-safe-exercises-joint-health",
    title: "Physiotherapy and Arthritis: Safe Exercises for Joint Health",
    excerpt:
      "Movement helps stiffness — but the wrong exercise can worsen pain. Our physiotherapy team shares safe routines for hips, knees, and hands.",
    category: "Physiotherapy",
    publishedAt: "2023-08-19",
    readTime: "5 min read",
    image: {
      src: "/images/home page services/Physiotherapy_Rehabilitation.png",
      alt: "Physiotherapy for arthritis rehabilitation",
    },
  },
  {
    id: "when-to-see-rheumatologist",
    slug: "when-to-see-rheumatologist-seven-warning-signs",
    title: "When Should You See a Rheumatologist? 7 Warning Signs",
    excerpt:
      "Persistent joint swelling, morning stiffness, unexplained rashes, or fatigue lasting weeks — seven signs that warrant a specialist evaluation.",
    category: "Patient Tips",
    publishedAt: "2023-07-02",
    readTime: "5 min read",
    image: {
      src: "/images/home page services/Rheumatology_Consultation.png",
      alt: "When to book a rheumatology consultation",
    },
  },
  {
    id: "telehealth-rheumatology-nepal",
    slug: "telehealth-rheumatology-nepal-specialist-care-from-home",
    title: "Telehealth Rheumatology in Nepal: Specialist Care Without Travel",
    excerpt:
      "Follow-up visits, medication reviews, and education sessions from home — how RAC Nepal telehealth supports patients outside Kathmandu.",
    category: "Telehealth",
    publishedAt: "2023-05-14",
    readTime: "4 min read",
    image: {
      src: "/images/Gallery/RacNepal-18-scaled.jpg",
      alt: "Telehealth rheumatology consultation at RAC Nepal",
    },
  },
  {
    id: "ankylosing-spondylitis-back-pain",
    slug: "ankylosing-spondylitis-chronic-back-pain-young-adults",
    title: "Ankylosing Spondylitis: When Chronic Back Pain Starts in Your 20s or 30s",
    excerpt:
      "Young adults often dismiss back pain as posture or strain. Learn how ankylosing spondylitis presents and why early diagnosis changes outcomes.",
    category: "Conditions",
    publishedAt: "2023-03-22",
    readTime: "7 min read",
    image: {
      src: "/images/condition/Ankylosing Spondylitis.png",
      alt: "Ankylosing spondylitis and chronic back pain",
    },
  },
  {
    id: "winter-joint-stiffness-tips",
    slug: "winter-joint-stiffness-tips-nepal-cold-weather",
    title: "Winter Joint Stiffness in Nepal: Warm-Up Tips for Colder Months",
    excerpt:
      "Many patients feel worse when temperatures drop. Simple warmth, gentle mobility, and medication timing can ease winter flare-ups.",
    category: "Lifestyle",
    publishedAt: "2023-01-08",
    readTime: "4 min read",
    image: {
      src: "/images/joints/5.jpg",
      alt: "Joint care tips for cold weather in Nepal",
    },
  },
] as const;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
