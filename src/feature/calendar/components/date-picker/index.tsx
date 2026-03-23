"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { DateRangePicker, usePickerLayout } from "@/src/components/ui/date-range-picker";
import { PickerFooter } from "./picker-footer";
import { PickerHeader } from "./picker-header";
import { useDateRange } from "./use-date-range";

export function DateRangePickerModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { width: modalWidth } = usePickerLayout();
  const {
    range,
    showWarning,
    blocksToDelete,
    isRangeComplete,
    defaultMonth,
    handleConfirm,
    handleRangeSelect,
  } = useDateRange(open, onOpenChange);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl flex flex-col"
          style={{
            width: modalWidth,
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.08)",
            overscrollBehavior: "contain",
          }}
          aria-describedby={undefined}
        >
          <PickerHeader range={range} />

          <div className="px-6 py-4">
            <DateRangePicker
              range={range}
              onRangeSelect={handleRangeSelect}
              defaultMonth={defaultMonth}
            />
          </div>

          <PickerFooter
            showWarning={showWarning}
            blocksToDelete={blocksToDelete}
            isRangeComplete={isRangeComplete}
            onConfirm={handleConfirm}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
