"use client";

import type { DateRange } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "react-day-picker/locale";
import { calendarClassNames, rdpStyleOverrides } from "./constants";
import { NavChevron } from "./nav-chevron";
import { usePickerLayout } from "./use-picker-layout";

// biome-ignore lint/style/useNamingConvention: rdp API requires PascalCase component keys
const calendarComponents = { Chevron: NavChevron };

interface DateRangePickerProps {
  range: DateRange | undefined;
  onRangeSelect: (range: DateRange | undefined) => void;
  defaultMonth?: Date;
}

export function DateRangePicker({ range, onRangeSelect, defaultMonth }: DateRangePickerProps) {
  const { numberOfMonths } = usePickerLayout();

  return (
    <div className="text-sm">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={onRangeSelect}
        locale={ko}
        numberOfMonths={numberOfMonths}
        defaultMonth={defaultMonth}
        classNames={calendarClassNames}
        components={calendarComponents}
        style={rdpStyleOverrides}
      />
    </div>
  );
}
