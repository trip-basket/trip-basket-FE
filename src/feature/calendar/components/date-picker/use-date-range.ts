import { useCallback, useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import useCalendarStore from "../../stores/use-calendar-store";
import { formatLocalDate } from "../../utils";

/**
 * Manages a selectable date range for a calendar UI, including local state, validation, and persistence.
 *
 * Initializes the picker range from existing trip days when opened, tracks whether a user warning is required
 * for removing scheduled blocks, computes how many blocks would be deleted by the selected range, and exposes
 * handlers to update the range or confirm and persist it.
 *
 * @param open - Whether the date picker is currently open
 * @param onOpenChange - Callback invoked with the new open state (use to close the picker after confirm)
 * @returns An object with the following properties:
 *  - range: The currently selected `DateRange` or `undefined`.
 *  - showWarning: `true` if the user must confirm deletion of blocks outside the selected range.
 *  - blocksToDelete: Number of scheduled blocks that fall outside the selected range.
 *  - isRangeComplete: `true` when both `range.from` and `range.to` are set.
 *  - defaultMonth: The month to display by default in the picker (uses `range.from` or current date).
 *  - handleConfirm: Call to validate, optionally show a warning, persist the range, and close the picker.
 *  - handleRangeSelect: Call to update the selected range and clear any warning.
 */
export function useDateRange(open: boolean, onOpenChange: (open: boolean) => void) {
  const tripDays = useCalendarStore((s) => s.tripDays);
  const updateDateRange = useCalendarStore((s) => s.updateDateRange);

  const [range, setRange] = useState<DateRange | undefined>();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (open && tripDays.length > 0) {
      setRange({
        from: new Date(`${tripDays[0].date}T00:00:00`),
        to: new Date(`${tripDays[tripDays.length - 1].date}T00:00:00`),
      });
      setShowWarning(false);
    }
  }, [open, tripDays]);

  const blocksToDelete = useMemo(() => {
    if (!range?.from || !range?.to) {
      return 0;
    }

    const newStart = range.from.getTime();
    const newEnd = range.to.getTime();

    let count = 0;
    for (const day of tripDays) {
      const dayTime = new Date(`${day.date}T00:00:00`).getTime();
      if (dayTime < newStart || dayTime > newEnd) {
        count += day.blocks.length;
      }
    }
    return count;
  }, [range, tripDays]);

  const isRangeComplete = !!(range?.from && range?.to);

  const handleConfirm = useCallback(() => {
    if (!range?.from || !range?.to) {
      return;
    }

    if (blocksToDelete > 0 && !showWarning) {
      setShowWarning(true);
      return;
    }

    updateDateRange(formatLocalDate(range.from), formatLocalDate(range.to));
    onOpenChange(false);
  }, [range, blocksToDelete, showWarning, updateDateRange, onOpenChange]);

  const handleRangeSelect = useCallback((newRange: DateRange | undefined) => {
    setRange(newRange);
    setShowWarning(false);
  }, []);

  const defaultMonth = range?.from ?? new Date();

  return {
    range,
    showWarning,
    blocksToDelete,
    isRangeComplete,
    defaultMonth,
    handleConfirm,
    handleRangeSelect,
  };
}
