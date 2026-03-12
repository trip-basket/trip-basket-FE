import * as Dialog from "@radix-ui/react-dialog";
import { Button, Text } from "@/src/components/ui";

/**
 * Render the date-picker footer that displays an optional deletion warning and action buttons.
 *
 * @param showWarning - Whether to show the deletion warning row
 * @param blocksToDelete - Number of blocks that will be deleted (used when showing the warning)
 * @param isRangeComplete - Whether the currently selected range is complete (controls confirm button enabled state)
 * @param onConfirm - Callback invoked when the confirm button is clicked
 * @returns The footer element containing the optional warning text and the cancel/confirm buttons
 */
export function PickerFooter({
  showWarning,
  blocksToDelete,
  isRangeComplete,
  onConfirm,
}: {
  showWarning: boolean;
  blocksToDelete: number;
  isRangeComplete: boolean;
  onConfirm: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-6 pb-5 pt-2">
      <div className="flex-1 min-w-0">
        {showWarning && blocksToDelete > 0 && (
          <div className="flex items-center gap-2" style={{ color: "var(--warning-600)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 5v3.5M8 10.5v.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M7.134 2.5a1 1 0 011.732 0l5.196 9a1 1 0 01-.866 1.5H2.804a1 1 0 01-.866-1.5l5.196-9z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            <Text variant="caption" className="text-inherit">
              범위 밖 {blocksToDelete}개의 블록이 삭제됩니다
            </Text>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Dialog.Close asChild>
          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            className="cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
          >
            취소
          </Button>
        </Dialog.Close>
        <Button
          size="sm"
          color={showWarning && blocksToDelete > 0 ? "danger" : "primary"}
          disabled={!isRangeComplete}
          onClick={onConfirm}
          className="cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
        >
          {showWarning && blocksToDelete > 0 ? "삭제하고 변경" : "확인"}
        </Button>
      </div>
    </div>
  );
}
