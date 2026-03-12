import * as Dialog from "@radix-ui/react-dialog";
import type { DateRange } from "react-day-picker";
import { Button, Text } from "@/src/components/ui";
import { formatSelectedRange } from "./utils";

/**
 * Renders the header for the date-picker dialog showing title, formatted selected range, and a close button.
 *
 * @param range - The selected date range to display; may be `undefined` when no range is selected.
 * @returns The header element containing the title, formatted range text, and a dialog close button.
 */
export function PickerHeader({ range }: { range: DateRange | undefined }) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-2">
      <div className="flex flex-col gap-0.5">
        <Dialog.Title asChild>
          <Text variant="body" weight="bold">
            여행 날짜 설정
          </Text>
        </Dialog.Title>
        <Text variant="small" color="sub">
          {formatSelectedRange(range)}
        </Text>
      </div>
      <Dialog.Close asChild>
        <Button
          variant="icon"
          color="neutral"
          size="sm"
          aria-label="닫기"
          className="cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </Dialog.Close>
    </div>
  );
}
