import { BLOCK_COLORS } from "../constants";
import type { BlockColorName, BlockColorPalette } from "../types";

export function getBlockColor(color: BlockColorName): BlockColorPalette {
  return BLOCK_COLORS[color];
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
