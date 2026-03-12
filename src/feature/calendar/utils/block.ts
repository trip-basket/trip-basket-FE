import { HOUR_HEIGHT, HOURS } from "../constants";
import type { CalendarBlock } from "../types";

export interface OverlapLayout {
  zIndex: number;
  rightInset: number;
}

const OVERLAP_WIDTH_STEP = 15;

/**
 * Compute horizontal stacking metadata for calendar blocks that overlap in time.
 *
 * Partitions the provided blocks into groups of mutually overlapping intervals and assigns layout metadata only for blocks that are part of an overlapping group.
 *
 * @param blocks - Array of calendar blocks (expected to have `id`, `startHour`, and `endHour`) to analyze for temporal overlap
 * @returns A map from block `id` to `OverlapLayout`. Each entry's `zIndex` is the stacking order within its overlapping group (1-based), and `rightInset` is the horizontal offset in pixels to apply per overlap step. Blocks that do not overlap any other block are not included in the map.
 */
export function computeOverlapLayout(
  blocks: CalendarBlock[],
): Map<string, OverlapLayout> {
  const layout = new Map<string, OverlapLayout>();
  if (blocks.length <= 1) {
    return layout;
  }

  const sorted = [...blocks].sort((a, b) => a.startHour - b.startHour);
  const groups: CalendarBlock[][] = [];
  let currentGroup: CalendarBlock[] = [sorted[0]];
  let maxEnd = sorted[0].endHour;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].startHour < maxEnd) {
      currentGroup.push(sorted[i]);
      maxEnd = sorted[i].endHour;
      continue;
    }

    groups.push(currentGroup);
    currentGroup = [sorted[i]];
    maxEnd = sorted[i].endHour;
  }

  groups.push(currentGroup);

  for (const group of groups) {
    if (group.length <= 1) {
      continue;
    }
    for (let i = 0; i < group.length; i++) {
      layout.set(group[i].id, {
        zIndex: i + 1,
        rightInset: i * OVERLAP_WIDTH_STEP,
      });
    }
  }

  return layout;
}

export function getBlockAbsolutePosition(block: CalendarBlock) {
  const gridStartHour = HOURS[0];

  return {
    top: (block.startHour - gridStartHour) * HOUR_HEIGHT,
    height: getBlockDuration(block) * HOUR_HEIGHT,
  };
}

export function getBlockDuration(block: CalendarBlock): number {
  return block.endHour - block.startHour;
}

export function formatBlockTime(block: CalendarBlock): string {
  return `${formatTime(block.startHour)} – ${formatTime(block.endHour)}`;
}

function formatTime(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
