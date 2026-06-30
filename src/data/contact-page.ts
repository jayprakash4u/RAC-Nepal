import { siteConfig } from "@/config/site";

export const contactPage = {
  title: "Contact Us",
  description:
    "Reach out to schedule an appointment, ask about our services, or speak with our rheumatology care team. We are here to help.",
  infoTitle: "Clinic information",
  formTitle: "Send us a message",
  formDescription:
    "Fill in the form below and our team will get back to you as soon as possible.",
  contact: siteConfig.contact,
  details: [
    {
      id: "phone",
      label: "Phone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    },
    {
      id: "email",
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      id: "address",
      label: "Address",
      value: siteConfig.contact.address,
    },
    {
      id: "hours",
      label: "Opening hours",
      value: siteConfig.contact.hours,
    },
  ],
  form: {
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    phoneLabel: "Phone number",
    phonePlaceholder: "+977-...",
    subjectLabel: "Subject",
    subjectPlaceholder: "Appointment inquiry",
    messageLabel: "Message",
    messagePlaceholder: "How can we help you?",
    submitLabel: "Send Message",
  },
} as const;
