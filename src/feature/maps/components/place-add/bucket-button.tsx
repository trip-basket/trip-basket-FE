"use client";

import { useCallback } from "react";
import { Button, Text } from "@/src/components/ui";
import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import type { Place } from "@/src/types";

export function BucketButton({ place }: { place: Place }) {
  const addToBucket = useCalendarStore((s) => s.addToBucket);

  const handleClick = useCallback(() => {
    addToBucket(place);
  }, [addToBucket, place]);

  return (
    <Button
      variant="bordered"
      size="sm"
      onClick={handleClick}
      className="flex-1 justify-center rounded-l-none rounded-r-button"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <Text variant="small" weight="medium">
        버킷에 담기
      </Text>
    </Button>
  );
}
