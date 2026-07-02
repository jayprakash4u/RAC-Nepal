export const siteConfig = {
  name: "Rheumatology and Arthritis Center",
  shortName: "RAC Nepal",
  tagline: "Enhancing Lives",
  description:
    "Expert rheumatology and arthritis care in Nepal. Compassionate treatment for joint and autoimmune conditions.",
  logo: {
    src: "/images/logo.png",
    alt: "Rheumatology and Arthritis Center — Enhancing Lives",
    width: 320,
    height: 90,
  },
  contact: {
    phone: "+977-986-3097509",
    email: "racnepal77@gmail.com",
    address: "Naxal, Kathmandu, Nepal (Beside Telecom)",
    hours: "Sun – Fri: 9:00 AM – 5:00 PM",
  },
  topBar: {
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      twitter: "https://twitter.com",
      youtube: "https://www.youtube.com/channel/UCZRdeeO5pwZBdA3GUcb6x-A",
    },
  },
  links: {
    appointment: "/contact",
  },
} as const;
