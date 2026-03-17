import { HOUR_HEIGHT, HOURS } from "../constants";
import type { ScheduledBlock } from "../types";

export interface OverlapLayout {
  zIndex: number;
  leftInset: number;
}

const OVERLAP_WIDTH_STEP = 15;

function groupOverlappingBlocks(sorted: ScheduledBlock[]): ScheduledBlock[][] {
  const groups: ScheduledBlock[][] = [];
  let currentGroup: ScheduledBlock[] = [sorted[0]];
  let maxEnd = sorted[0].endHour;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].startHour < maxEnd) {
      currentGroup.push(sorted[i]);
      maxEnd = Math.max(maxEnd, sorted[i].endHour);
    } else {
      groups.push(currentGroup);
      currentGroup = [sorted[i]];
      maxEnd = sorted[i].endHour;
    }
  }

  groups.push(currentGroup);
  return groups;
}

function findMinAvailableDepth(
  placed: { endHour: number; depth: number }[],
  startHour: number,
): number {
  const occupied = new Set<number>();
  for (const p of placed) {
    if (p.endHour > startHour) {
      occupied.add(p.depth);
    }
  }

  let depth = 0;
  while (occupied.has(depth)) {
    depth++;
  }
  return depth;
}

export function computeOverlapLayout(blocks: ScheduledBlock[]): Map<string, OverlapLayout> {
  const layout = new Map<string, OverlapLayout>();
  if (blocks.length <= 1) {
    return layout;
  }

  const sorted = [...blocks].sort((a, b) => a.startHour - b.startHour);
  const groups = groupOverlappingBlocks(sorted);

  for (const group of groups) {
    if (group.length <= 1) {
      continue;
    }

    const placed: { endHour: number; depth: number }[] = [{ endHour: group[0].endHour, depth: 0 }];

    for (let i = 1; i < group.length; i++) {
      const el = group[i];
      const depth = findMinAvailableDepth(placed, el.startHour);

      placed.push({ endHour: el.endHour, depth });

      if (depth > 0) {
        layout.set(el.id, {
          zIndex: depth,
          leftInset: depth * OVERLAP_WIDTH_STEP,
        });
      }
    }
  }

  return layout;
}

export function getBlockAbsolutePosition(block: ScheduledBlock) {
  const gridStartHour = HOURS[0];

  return {
    top: (block.startHour - gridStartHour) * HOUR_HEIGHT,
    height: getBlockDuration(block) * HOUR_HEIGHT,
  };
}

export function getBlockDuration(block: ScheduledBlock): number {
  return block.endHour - block.startHour;
}

export function formatBlockTime(block: ScheduledBlock): string {
  return `${formatTime(block.startHour)} – ${formatTime(block.endHour)}`;
}

function formatTime(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
