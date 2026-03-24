"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { Button, Input, Text } from "@/src/components/ui";
import {
  DateRangeLabel,
  DateRangePicker,
  usePickerLayout,
} from "@/src/components/ui/date-range-picker";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { request } from "@/src/lib/request";
import { type CreateRoomInput, createRoomSchema } from "../../utils/validate-create-room";

interface CreateRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function CreateRoomModal({ open, onOpenChange }: CreateRoomModalProps) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const { width: pickerWidth } = usePickerLayout();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<CreateRoomInput>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: { name: "", tripStartDate: "", tripEndDate: "" },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
      setRange(undefined);
    }
    onOpenChange(nextOpen);
  };

  const handleRangeSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    setValue("tripStartDate", newRange?.from ? formatDate(newRange.from) : "");
    setValue("tripEndDate", newRange?.to ? formatDate(newRange.to) : "");
    clearErrors(["tripStartDate", "tripEndDate"]);
  };

  const onSubmit = async (data: CreateRoomInput) => {
    const room = await request(() => roomApi.create(data), ROOM_ERROR_MESSAGES.create);
    if (room) {
      handleOpenChange(false);
      window.location.href = `/plan/${room.id}`;
    }
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
              <Button
                variant="icon"
                color="neutral"
                size="sm"
                aria-label="닫기"
                className="cursor-pointer"
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

          {/* Name Input */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 flex flex-col gap-4">
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
              <Button variant="ghost" color="neutral" size="sm" className="cursor-pointer">
                취소
              </Button>
            </Dialog.Close>
            <Button
              size="sm"
              color="primary"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="cursor-pointer"
            >
              {isSubmitting ? "생성 중..." : "만들기"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
