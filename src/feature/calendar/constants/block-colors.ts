import type { BlockColorName, BlockColorPalette, PlaceCategory } from "../types";

export const BLOCK_COLORS: Record<BlockColorName, BlockColorPalette> = {
  sky: {
    base: "var(--block-sky-base)",
    tint: "var(--block-sky-tint)",
    accent: "var(--block-sky-accent)",
  },
  indigo: {
    base: "var(--block-indigo-base)",
    tint: "var(--block-indigo-tint)",
    accent: "var(--block-indigo-accent)",
  },
  violet: {
    base: "var(--block-violet-base)",
    tint: "var(--block-violet-tint)",
    accent: "var(--block-violet-accent)",
  },
  rose: {
    base: "var(--block-rose-base)",
    tint: "var(--block-rose-tint)",
    accent: "var(--block-rose-accent)",
  },
  teal: {
    base: "var(--block-teal-base)",
    tint: "var(--block-teal-tint)",
    accent: "var(--block-teal-accent)",
  },
  amber: {
    base: "var(--block-amber-base)",
    tint: "var(--block-amber-tint)",
    accent: "var(--block-amber-accent)",
  },
  fuchsia: {
    base: "var(--block-fuchsia-base)",
    tint: "var(--block-fuchsia-tint)",
    accent: "var(--block-fuchsia-accent)",
  },
  slate: {
    base: "var(--block-slate-base)",
    tint: "var(--block-slate-tint)",
    accent: "var(--block-slate-accent)",
  },
};

export const CATEGORY_COLOR: Record<PlaceCategory, BlockColorName> = {
  sightseeing: "sky",
  food: "amber",
  shopping: "violet",
  transport: "indigo",
  accommodation: "teal",
  activity: "rose",
  other: "slate",
};

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  sightseeing: "관광",
  food: "음식",
  shopping: "쇼핑",
  transport: "교통",
  accommodation: "숙소",
  activity: "액티비티",
  other: "기타",
};
