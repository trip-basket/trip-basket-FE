"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useState } from "react";
import { Button, Text } from "@/src/components/ui";
import type { Place } from "@/src/types";
import useCalendarStore from "../../stores/use-calendar-store";
import { DEFAULT_BLOCK_DURATION } from "../../types";
import { PlaceSearchMap } from "./place-search-map";
import { TimeSelector } from "./time-selector";

interface CreateBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: string;
  defaultStartHour: number;
}

export function CreateBlockModal({
  open,
  onOpenChange,
  date,
  defaultStartHour,
}: CreateBlockModalProps) {
  const addToCalendar = useCalendarStore((s) => s.addToCalendar);

  const [place, setPlace] = useState<Place | null>(null);
  const [startHour, setStartHour] = useState(defaultStartHour);
  const [endHour, setEndHour] = useState(defaultStartHour + DEFAULT_BLOCK_DURATION);

  const handlePlaceSelect = useCallback((selectedPlace: Place) => {
    setPlace(selectedPlace);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!place) {
      return;
    }
    addToCalendar(place, date, startHour, endHour);
    onOpenChange(false);
  }, [place, date, startHour, endHour, addToCalendar, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl flex flex-col w-[560px] max-h-[90vh]"
          style={{
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.08)",
          }}
          aria-describedby={undefined}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <Dialog.Title asChild>
              <Text variant="body" weight="bold">
                블록 추가
              </Text>
            </Dialog.Title>
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

          {/* Body */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 flex flex-col gap-5">
            {/* Place Search */}
            <div className="flex flex-col gap-2">
              <PlaceSearchMap selectedPlace={place} onPlaceSelect={handlePlaceSelect} />
            </div>

            {/* Time */}
            <TimeSelector
              startHour={startHour}
              endHour={endHour}
              onStartHourChange={setStartHour}
              onEndHourChange={setEndHour}
            />
          </div>

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
              disabled={!place}
              onClick={handleSubmit}
              className="cursor-pointer"
            >
              추가
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
