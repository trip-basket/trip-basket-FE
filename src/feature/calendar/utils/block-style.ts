import { BLOCK_COLORS } from "../constants";
import type { BlockColor } from "../types";

export function getBlockColor(colorIndex: number): BlockColor {
  const len = BLOCK_COLORS.length;
  return BLOCK_COLORS[((colorIndex % len) + len) % len];
}

export function getBlockShadow(isDragging: boolean, blockColor: BlockColor): string {
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
