"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "react-day-picker/locale";
import { Button, Text } from "@/src/components/ui";
import {
  calendarClassNames as baseCalendarClassNames,
  rdpStyleOverrides,
} from "@/src/components/ui/date-range-picker/constants";
import { NavChevron } from "@/src/components/ui/date-range-picker/nav-chevron";
import { HOURS } from "../../../constants";
import { formatLocalDate } from "../../../utils";

const gridStartHour = HOURS[0];
const gridEndHour = HOURS[HOURS.length - 1];

const singleCalendarClassNames = {
  ...baseCalendarClassNames,
  // biome-ignore lint/style/useNamingConvention: rdp API
  day_button:
    "rdp-day_button [.rdp-selected_&]:!bg-[#F9B624] [.rdp-selected_&]:!text-white [.rdp-selected_&]:!border-none",
};

// biome-ignore lint/style/useNamingConvention: rdp API requires PascalCase component keys
const calendarComponents = { Chevron: NavChevron };

function generateTimeSlots(): { label: string; value: string }[] {
  const slots: { label: string; value: string }[] = [];
  for (let h = 7; h < 23; h++) {
    const hStr = String(h).padStart(2, "0");
    slots.push({ label: `${hStr}:00`, value: `${hStr}:00` });
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function hourToSlot(hour: number): string {
  const h = Math.max(7, Math.min(22, Math.floor(hour)));
  return `${String(h).padStart(2, "0")}:00`;
}

function slotToHour(slot: string): number {
  const [h, m] = slot.split(":").map(Number);
  return h + m / 60;
}

interface DateTimeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDate: string;
  currentStartHour: number;
  duration: number;
  dateRange: { start: string; end: string };
  onConfirm: (date: string, startHour: number) => void;
}

export function DateTimeDialog({
  open,
  onOpenChange,
  currentDate,
  currentStartHour,
  duration,
  dateRange,
  onConfirm,
}: DateTimeDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    () => new Date(`${currentDate}T00:00:00`),
  );
  const [selectedTime, setSelectedTime] = useState(() => hourToSlot(currentStartHour));
  const [error, setError] = useState<string | null>(null);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setSelectedDate(new Date(`${currentDate}T00:00:00`));
      setSelectedTime(hourToSlot(currentStartHour));
      setError(null);
    }
    onOpenChange(isOpen);
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      return;
    }
    const date = formatLocalDate(selectedDate);
    const startHour = slotToHour(selectedTime);
    const endHour = startHour + duration;

    if (date < dateRange.start || date > dateRange.end) {
      setError("여행 기간 내 날짜를 선택해주세요.");
      return;
    }
    if (startHour < gridStartHour) {
      setError(`시작 시간은 ${gridStartHour}시 이후여야 합니다.`);
      return;
    }
    if (endHour > gridEndHour) {
      setError(`종료 시간이 ${gridEndHour}시를 초과합니다.`);
      return;
    }

    setError(null);
    onConfirm(date, startHour);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-[60]" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white rounded-2xl w-full max-w-sm flex flex-col"
          style={{
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.08)",
          }}
          aria-describedby={undefined}
        >
          <div className="flex flex-col gap-4 p-6 justify-center">
            <div className="">
              <Dialog.Title asChild>
                <Text variant="body" weight="bold">
                  날짜 및 시간
                </Text>
              </Dialog.Title>
            </div>

            <div className="flex items-center justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={ko}
                numberOfMonths={1}
                defaultMonth={selectedDate}
                classNames={singleCalendarClassNames}
                components={calendarComponents}
                style={rdpStyleOverrides}
              />
            </div>

            <div className="">
              <Text variant="small" weight="medium" className="mb-2">
                시작 시간
              </Text>
              <Select.Root value={selectedTime} onValueChange={setSelectedTime}>
                <Select.Trigger className="inline-flex items-center justify-between w-full rounded-lg border border-outline bg-inset px-3 py-2 text-sm text-sub hover:bg-hover transition-colors duration-150 cursor-pointer">
                  <Select.Value placeholder="시간 선택" />
                  <Select.Icon>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-muted"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="bg-white rounded-lg border border-outline shadow-lg overflow-hidden z-[70]"
                    position="popper"
                    side="top"
                    sideOffset={4}
                  >
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                      </svg>
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1 max-h-[200px]">
                      {TIME_SLOTS.map((slot) => (
                        <Select.Item
                          key={slot.value}
                          value={slot.value}
                          className="relative flex items-center px-3 py-1.5 text-sm rounded-md cursor-pointer select-none data-[highlighted]:bg-hover data-[state=checked]:font-medium data-[state=checked]:text-[var(--text-accent)] outline-none"
                        >
                          <Select.ItemText>{slot.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {error && (
              <Text variant="caption" color="error">
                {error}
              </Text>
            )}

            <div className="flex justify-end">
              <Dialog.Close asChild>
                <Button variant="borderless" size="sm" className="cursor-pointer">
                  취소
                </Button>
              </Dialog.Close>
              <Button
                variant="confirm"
                size="sm"
                onClick={handleConfirm}
                disabled={!selectedDate}
                className="cursor-pointer"
              >
                확인
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
