"use client";

import * as Popover from "@radix-ui/react-popover";
import { useCallback, useState } from "react";
import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import type { Place } from "@/src/types";
import { DatePopoverContent } from "./date-popover";

export function PlaceAddButton({ place }: { place: Place }) {
  const [isOpen, setIsOpen] = useState(false);

  const tripDays = useCalendarStore((s) => s.tripDays);
  const addToBucket = useCalendarStore((s) => s.addToBucket);
  const addToCalendar = useCalendarStore((s) => s.addToCalendar);

  const handleAddToBucket = useCallback(() => {
    addToBucket(place);
  }, [addToBucket, place]);

  const handleAddToCalendar = useCallback(
    (date: string, startHour: number) => {
      addToCalendar(place, date, startHour);
      setIsOpen(false);
    },
    [addToCalendar, place],
  );

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex rounded-lg overflow-hidden">
        {/* 펼치기 버튼 (왼쪽) */}
        <Popover.Trigger asChild>
          <button
            type="button"
            className="flex items-center justify-center w-9 bg-action text-on-action hover:bg-action-hover transition-colors cursor-pointer"
            aria-label="날짜 선택"
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
          </button>
        </Popover.Trigger>

        {/* 구분선 */}
        <div className="w-px bg-action-hover" />

        {/* 메인 버튼: 버킷에 담기 (오른쪽) */}
        <button
          type="button"
          onClick={handleAddToBucket}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium bg-action text-on-action hover:bg-action-hover transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          버킷에 담기
        </button>
      </div>

      {tripDays.length > 0 && (
        <Popover.Portal>
          <Popover.Content
            side="top"
            align="start"
            sideOffset={8}
            collisionPadding={16}
            className="z-50 animate-in fade-in-0 zoom-in-95"
          >
            <DatePopoverContent tripDays={tripDays} onSelect={handleAddToCalendar} />
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  );
}
