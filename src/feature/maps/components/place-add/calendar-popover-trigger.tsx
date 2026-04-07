"use client";

import * as Popover from "@radix-ui/react-popover";
import { useCallback, useState } from "react";
import { Button } from "@/src/components/ui";
import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import type { Place } from "@/src/types";
import { DatePopoverContent } from "./date-popover";

export function CalendarPopoverTrigger({ place }: { place: Place }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasTripDays = useCalendarStore((s) => s.tripDays.length > 0);
  const addToCalendar = useCalendarStore((s) => s.addToCalendar);

  const handleSelect = useCallback(
    (date: string, startHour: number) => {
      addToCalendar(place, date, startHour);
      setIsOpen(false);
    },
    [addToCalendar, place],
  );

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!hasTripDays && open) {
          return;
        }
        setIsOpen(open);
      }}
    >
      <Popover.Trigger asChild>
        <Button
          variant="bordered"
          size="sm"
          disabled={!hasTripDays}
          className="flex items-center justify-center w-9 px-0 rounded-l-button rounded-r-none border-r-0"
          aria-label={hasTripDays ? "날짜 선택" : "여행 날짜를 먼저 추가해 주세요"}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </Popover.Trigger>

      {hasTripDays && (
        <Popover.Portal>
          <Popover.Content
            side="top"
            align="start"
            sideOffset={8}
            collisionPadding={16}
            className="z-50 animate-in fade-in-0 zoom-in-95"
          >
            <DatePopoverContent onSelect={handleSelect} />
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  );
}
