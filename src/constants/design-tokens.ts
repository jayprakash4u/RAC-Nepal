export const colors = {
  primary: "#1496A8",
  primaryDark: "#0B5D6B",
  primarySoft: "color-mix(in srgb, #0B5D6B 22%, white)",
  navy: "#0F172A",
  hero: "var(--color-primary-soft)",
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate600: "#475569",
  background: "#FFFFFF",
  foreground: "#0F172A",
  muted: "#475569",
  border: "#E2E8F0",
  surface: "#F8FAFC",
} as const;

export const spacing = {
  4: 4,
  8: 8,
  16: 16,
  24: 24,
  32: 32,
  48: 48,
  64: 64,
  96: 96,
  128: 128,
} as const;

export const spacingAliases = {
  xs: spacing[4],
  sm: spacing[8],
  md: spacing[16],
  lg: spacing[24],
  xl: spacing[32],
  "2xl": spacing[48],
  "3xl": spacing[64],
  "4xl": spacing[96],
  "5xl": spacing[128],
} as const;

export const typography = {
  hero: {
    fontSize: "3.75rem",
    lineHeight: "1.1",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    tailwind: "text-hero",
  },
  h1: {
    fontSize: "3rem",
    lineHeight: "1.15",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    tailwind: "text-h1",
  },
  h2: {
    fontSize: "2.25rem",
    lineHeight: "1.2",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    tailwind: "text-h2",
  },
  h3: {
    fontSize: "1.875rem",
    lineHeight: "1.25",
    fontWeight: 600,
    letterSpacing: "-0.015em",
    tailwind: "text-h3",
  },
  body: {
    fontSize: "1rem",
    lineHeight: "1.625",
    fontWeight: 400,
    tailwind: "text-body",
  },
  small: {
    fontSize: "0.875rem",
    lineHeight: "1.5",
    fontWeight: 400,
    tailwind: "text-small",
  },
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
  card: 12,
  button: 8,
} as const;

export const container = {
  content: "72rem",
  narrow: "48rem",
  wide: "80rem",
} as const;

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  header: 30,
  overlay: 40,
  modal: 50,
} as const;

export const designTokens = {
  colors,
  spacing,
  spacingAliases,
  typography,
  radius,
  container,
  zIndex,
} as const;

export default designTokens;
