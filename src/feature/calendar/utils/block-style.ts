import { BLOCK_COLORS, CATEGORY_COLOR } from "../constants";
import type { BlockColorPalette, PlaceCategory } from "../types";

const DEFAULT_BLOCK_COLOR_NAME = "slate" as const;

export function getBlockColor(category: PlaceCategory | undefined): BlockColorPalette {
  const colorName =
    category && CATEGORY_COLOR[category] ? CATEGORY_COLOR[category] : DEFAULT_BLOCK_COLOR_NAME;
  return BLOCK_COLORS[colorName];
}

export function getBlockShadow(isDragging: boolean, blockColor: BlockColorPalette): string {
  if (isDragging) {
    return "0 8px 24px rgba(0,0,0,0.15)";
  }
  return `0 2px 10px color-mix(in srgb, ${blockColor.accent} 20%, transparent), inset 0 0 0 1px ${blockColor.tint}`;
}

export function formatCurrency(cost: number, currency?: string): string {
  if (!currency) {
    return cost.toLocaleString();
  }
  return `${currency} ${cost.toLocaleString()}`;
}
