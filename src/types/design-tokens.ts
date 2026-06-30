import { designTokens } from "@/constants/design-tokens";

export type ColorToken = keyof typeof designTokens.colors;
export type SpacingToken = keyof typeof designTokens.spacing;
export type SpacingAlias = keyof typeof designTokens.spacingAliases;
export type TypographyToken = keyof typeof designTokens.typography;
export type RadiusToken = keyof typeof designTokens.radius;
export type ContainerToken = keyof typeof designTokens.container;
export type ZIndexToken = keyof typeof designTokens.zIndex;

export type TypographyStyle = (typeof designTokens.typography)[TypographyToken];
