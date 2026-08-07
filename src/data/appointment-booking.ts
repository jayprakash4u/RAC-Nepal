import { siteConfig } from "@/config/site";

export const appointmentBookingContent = {
  title: "Book an Appointment",
  description:
    "Request a consultation with our rheumatology team. We will confirm your appointment by phone or email.",
  hoursNote: siteConfig.contact.hours,
  form: {
    nameLabel: "Full name",
    namePlaceholder: "Your full name",
    phoneLabel: "Phone number",
    phonePlaceholder: "+977-...",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    typeLabel: "Appointment type",
    typePlaceholder: "Select appointment type",
    dateLabel: "Preferred date",
    timeLabel: "Preferred time",
    timePlaceholder: "Select a time",
    messageLabel: "Additional notes",
    messagePlaceholder: "Briefly describe your symptoms or reason for visit (optional)",
    submitLabel: "Request Appointment",
  },
  appointmentTypes: [
    { value: "consultation", label: "New consultation" },
    { value: "follow-up", label: "Follow-up visit" },
    { value: "telehealth", label: "Telehealth / virtual visit" },
    { value: "second-opinion", label: "Second opinion" },
  ],
  preferredTimes: [
    { value: "morning", label: "Morning (9 AM – 12 PM)" },
    { value: "afternoon", label: "Afternoon (12 PM – 5 PM)" },
    { value: "flexible", label: "Flexible / any available slot" },
  ],
  success: {
    title: "Appointment request received",
    description:
      "Thank you. Our care team will contact you shortly to confirm your appointment.",
  },
  footer: {
    prefix: "Need immediate assistance?",
    phoneLabel: "Call us at",
  },
} as const;
