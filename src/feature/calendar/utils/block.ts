import { HOUR_HEIGHT, HOURS } from "../constants";
import type { ScheduledBlock } from "../types";

export interface OverlapLayout {
  zIndex: number;
  leftInset: number;
}

const OVERLAP_WIDTH_STEP = 15;

export function computeOverlapLayout(blocks: ScheduledBlock[]): Map<string, OverlapLayout> {
  const layout = new Map<string, OverlapLayout>();
  if (blocks.length <= 1) {
    return layout;
  }

  const sorted = [...blocks].sort((a, b) => a.startHour - b.startHour);
  const groups: ScheduledBlock[][] = [];
  let currentGroup: ScheduledBlock[] = [sorted[0]];
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
        leftInset: i * OVERLAP_WIDTH_STEP,
      });
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
