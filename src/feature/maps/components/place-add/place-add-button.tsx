"use client";

import type { Place } from "@/src/types";
import { BucketButton } from "./bucket-button";
import { CalendarPopoverTrigger } from "./calendar-popover-trigger";

export function PlaceAddButton({ place }: { place: Place }) {
  return (
    <div className="flex">
      <CalendarPopoverTrigger place={place} />
      <BucketButton place={place} />
    </div>
  );
}
