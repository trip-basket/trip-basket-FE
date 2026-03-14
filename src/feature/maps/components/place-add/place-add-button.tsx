"use client";

import type { Place } from "@/src/types";
import { BucketButton } from "./bucket-button";
import { CalendarPopoverTrigger } from "./calendar-popover-trigger";

export function PlaceAddButton({ place }: { place: Place }) {
  return (
    <div className="flex rounded-lg overflow-hidden">
      <CalendarPopoverTrigger place={place} />
      <div className="w-px bg-action-hover" />
      <BucketButton place={place} />
    </div>
  );
}
