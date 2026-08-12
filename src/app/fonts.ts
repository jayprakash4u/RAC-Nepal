import { Inter, Outfit } from "next/font/google";

// Shared by both root layouts — `(site)/layout.tsx` and `(admin)/layout.tsx` —
// so the CSS variables the design tokens reference resolve in either group.
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const fontVariables = `${inter.variable} ${outfit.variable}`;
