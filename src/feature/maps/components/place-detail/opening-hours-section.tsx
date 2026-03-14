"use client";

import { useState } from "react";
import type { OpeningHour } from "@/src/types";
import { OpeningHoursCollapsed } from "./opening-hours-collapsed";
import { OpeningHoursExpanded } from "./opening-hours-expanded";

export function OpeningHoursSection({ hours }: { hours: OpeningHour[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-3">
      {isExpanded ? (
        <OpeningHoursExpanded hours={hours} onCollapse={() => setIsExpanded(false)} />
      ) : (
        <OpeningHoursCollapsed hours={hours} onExpand={() => setIsExpanded(true)} />
      )}
    </div>
  );
}
