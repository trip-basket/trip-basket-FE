import type { OpeningHour } from "@/src/types";

export const DAY_ABBR = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const DAY_NAME = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getTodayIndex(): number {
  return new Date().getDay();
}

export function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  if (minute === 0) {
    return `${displayHour}${period}`;
  }
  return `${displayHour}:${String(minute).padStart(2, "0")}${period}`;
}

export function formatRange(entry: OpeningHour): string {
  const open = formatTime(entry.open);
  const close = entry.close ? formatTime(entry.close) : "Close N/A";
  return `${open}–${close}`;
}
