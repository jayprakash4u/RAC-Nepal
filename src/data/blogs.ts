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
    image: { src: "", alt: "World Arthritis Day 2024" },
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
    image: { src: "", alt: "Rheumatologists at RAC Nepal" },
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
    image: { src: "", alt: "Knee pain relief tips" },
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
    image: { src: "", alt: "Rheumatoid arthritis treatment in Nepal" },
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
    image: { src: "", alt: "गठिया रोगका लागि जीवनशैली टिप्स" },
  },
] as const;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
