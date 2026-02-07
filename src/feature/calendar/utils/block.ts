import { HOUR_HEIGHT, HOURS } from "../constants";
import type { CalendarBlock } from "../types";

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
