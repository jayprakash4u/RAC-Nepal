import type { NavItem } from "@/types/navigation";
import { conditionNavLinks } from "@/data/conditions-nav";
import { serviceNavLinks } from "@/data/services";

export const mainNavigation: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    children: serviceNavLinks,
  },
  {
    label: "Conditions Treated",
    children: conditionNavLinks,
  },
  { label: "Contact Us", href: "/contact" },
  {
    label: "Other",
    children: [
      { label: "Blogs", href: "/blogs" },
      { label: "Gallery", href: "/gallery" },
      { label: "Telehealth Services", href: "/telehealth-services" },
      { label: "Our Alliance", href: "/our-alliance" },
    ],
  },
];
