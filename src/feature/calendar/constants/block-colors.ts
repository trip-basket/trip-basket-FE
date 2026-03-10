import type { BlockCategory, BlockColor } from "../types";

export const BLOCK_COLORS: BlockColor[] = [
  {
    base: "var(--block-sky-base)",
    tint: "var(--block-sky-tint)",
    accent: "var(--block-sky-accent)",
  },
  {
    base: "var(--block-indigo-base)",
    tint: "var(--block-indigo-tint)",
    accent: "var(--block-indigo-accent)",
  },
  {
    base: "var(--block-violet-base)",
    tint: "var(--block-violet-tint)",
    accent: "var(--block-violet-accent)",
  },
  {
    base: "var(--block-rose-base)",
    tint: "var(--block-rose-tint)",
    accent: "var(--block-rose-accent)",
  },
  {
    base: "var(--block-teal-base)",
    tint: "var(--block-teal-tint)",
    accent: "var(--block-teal-accent)",
  },
  {
    base: "var(--block-amber-base)",
    tint: "var(--block-amber-tint)",
    accent: "var(--block-amber-accent)",
  },
  {
    base: "var(--block-fuchsia-base)",
    tint: "var(--block-fuchsia-tint)",
    accent: "var(--block-fuchsia-accent)",
  },
  {
    base: "var(--block-slate-base)",
    tint: "var(--block-slate-tint)",
    accent: "var(--block-slate-accent)",
  },
];

export const CATEGORY_LABELS: Record<BlockCategory, string> = {
  sightseeing: "관광",
  food: "음식",
  shopping: "쇼핑",
  transport: "교통",
  accommodation: "숙소",
  activity: "액티비티",
};
