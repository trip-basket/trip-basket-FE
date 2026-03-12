import type { DateRange } from "react-day-picker";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

/**
 * Format a react-day-picker DateRange into a localized Korean string that describes the selected dates and duration.
 *
 * @param range - The selected date range; may be `undefined` or contain only `from` or both `from` and `to`.
 * @returns A Korean display string:
 * - `"날짜를 선택하세요"` if `from` is missing.
 * - `"<fromDate> –"` if `from` exists but `to` is missing.
 * - `"<fromDate> – <toDate> · <N>일"` if both `from` and `to` exist, where dates use the `ko-KR` long-month numeric-day format and `N` is the inclusive number of days.
 */
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
