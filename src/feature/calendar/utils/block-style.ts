import { BLOCK_COLORS } from "../constants";
import type { BlockColor } from "../types";

export function getBlockColor(colorIndex: number): BlockColor {
  return BLOCK_COLORS[colorIndex % BLOCK_COLORS.length];
}

export function getBlockShadow(isDragging: boolean, blockColor: BlockColor): string {
  if (isDragging) {
    return "0 8px 24px rgba(0,0,0,0.15)";
  }
  return `0 2px 10px color-mix(in srgb, ${blockColor.accent} 20%, transparent), inset 0 0 0 1px ${blockColor.tint}`;
}

export function formatCurrency(cost: number, currency: string): string {
  return `${currency} ${cost.toLocaleString()}`;
}
