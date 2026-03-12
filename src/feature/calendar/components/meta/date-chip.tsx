import { Text } from "@/src/components/ui";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

/**
 * Format an inclusive date range into Korean month/day text and append the total number of days.
 *
 * @param start - A date string parseable by `Date` representing the range start (e.g., ISO 8601).
 * @param end - A date string parseable by `Date` representing the range end (inclusive).
 * @returns A string like "3월 1일 – 3월 3일 · 3일" showing the formatted start and end dates and the inclusive day count.
 */
function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const days = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${dateFormatter.format(s)} – ${dateFormatter.format(e)} · ${days}일`;
}

/**
 * Render a compact date-range chip displaying a calendar icon and the formatted start–end dates.
 *
 * @param startDate - Start date string parsable by the JavaScript Date constructor
 * @param endDate - End date string parsable by the JavaScript Date constructor
 * @param onClick - Optional click handler invoked when the chip is clicked
 * @returns A button element styled as a chip containing a calendar glyph and the formatted date range
 */
export function DateChip({
  startDate,
  endDate,
  onClick,
}: {
  startDate: string;
  endDate: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="chip-inset chip-inset--strong shrink-0" onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3 10h18M8 2v4M16 2v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <Text variant="caption" className="text-inherit">
        {formatDateRange(startDate, endDate)}
      </Text>
    </button>
  );
}
