"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button, Input, Text } from "@/src/components/ui";
import {
  DateRangeLabel,
  DateRangePicker,
  usePickerLayout,
} from "@/src/components/ui/date-range-picker";
import { useCreateRoomForm } from "../../hooks/use-create-room-form";

interface CreateRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRoomModal({ open, onOpenChange }: CreateRoomModalProps) {
  const { width: pickerWidth } = usePickerLayout();
  const { range, errors, isPending, register, resetForm, handleRangeSelect, onSubmit } =
    useCreateRoomForm(() => onOpenChange(false));

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl flex flex-col"
          style={{
            width: pickerWidth,
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.08)",
            overscrollBehavior: "contain",
          }}
          aria-describedby={undefined}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <div className="flex flex-col gap-0.5">
              <Dialog.Title asChild>
                <Text variant="body" weight="bold">
                  새 여행 만들기
                </Text>
              </Dialog.Title>
              <DateRangeLabel range={range} />
            </div>
            <Dialog.Close asChild>
              <Button variant="borderless" size="icon" aria-label="닫기" className="cursor-pointer">
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

          {/* Name Input */}
          <form onSubmit={onSubmit} className="px-6 py-4 flex flex-col gap-4">
            <Input
              label="여행 이름"
              placeholder="예: 런던 여행"
              error={errors.name?.message}
              {...register("name")}
            />
          </form>

          {/* Date Range Picker */}
          <div className="px-6 py-4">
            <DateRangePicker range={range} onRangeSelect={handleRangeSelect} />
          </div>
          {(errors.tripStartDate || errors.tripEndDate) && (
            <div className="px-6">
              <Text variant="caption" color="error">
                {errors.tripStartDate?.message || errors.tripEndDate?.message}
              </Text>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-6 pb-5 pt-2">
            <Dialog.Close asChild>
              <Button variant="borderless" size="sm" className="cursor-pointer">
                취소
              </Button>
            </Dialog.Close>
            <Button
              size="sm"
              variant="confirm"
              disabled={isPending}
              onClick={onSubmit}
              className="cursor-pointer"
            >
              {isPending ? "생성 중..." : "만들기"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
