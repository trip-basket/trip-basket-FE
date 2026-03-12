import type { DateRange } from "react-day-picker";

export function formatLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

export function formatSelectedRange(range: DateRange | undefined): string {
  if (!range?.from) {
    return "날짜를 선택하세요";
  }
  if (!range.to) {
    return `${dateFormatter.format(range.from)} \u2013`;
  }
  const days = Math.floor((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${dateFormatter.format(range.from)} \u2013 ${dateFormatter.format(range.to)} \u00b7 ${days}일`;
}
