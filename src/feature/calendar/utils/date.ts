/**
 * Format a Date as a local date string in the form `YYYY-MM-DD`.
 *
 * @param d - The Date whose local year, month, and day will be formatted
 * @returns The formatted date string `YYYY-MM-DD`
 */
export function formatLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
