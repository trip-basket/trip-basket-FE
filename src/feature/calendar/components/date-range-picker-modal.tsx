"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import type { DateRange } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { Button, Text } from "@/src/components/ui";
import useCalendarStore from "../stores/use-calendar-store";

function NavChevron({
  orientation,
  size = 20,
}: {
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: "left" | "right" | "up" | "down";
}) {
  const d = orientation === "left" ? "M10 4l-4 4 4 4" : "M6 4l4 4-4 4";
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="text-sub">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const rdpStyleOverrides = {
  "--rdp-accent-color": "var(--brand-500)",
  "--rdp-accent-background-color": "var(--brand-100)",
  "--rdp-today-color": "var(--brand-500)",
  "--rdp-range_start-date-background-color": "var(--brand-500)",
  "--rdp-range_end-date-background-color": "var(--brand-500)",
  "--rdp-range_middle-background-color": "var(--brand-50)",
  "--rdp-day_button-border-radius": "50%",
  "--rdp-selected-border": "none",
  "--rdp-nav_button-width": "40px",
  "--rdp-nav_button-height": "36px",
} as React.CSSProperties;

const DATE_PICKER_BREAKPOINT = 720;
const DATE_PICKER_WIDTH_SM = 350;
const DATE_PICKER_WIDTH_LG = 700;

function useIsWideScreen() {
  const query = `(min-width: ${DATE_PICKER_BREAKPOINT}px)`;
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => true,
  );
}

function formatLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

function formatSelectedRange(range: DateRange | undefined): string {
  if (!range?.from) {
    return "날짜를 선택하세요";
  }
  if (!range.to) {
    return `${dateFormatter.format(range.from)} \u2013`;
  }
  const days = Math.floor((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${dateFormatter.format(range.from)} \u2013 ${dateFormatter.format(range.to)} \u00b7 ${days}일`;
}

export function DateRangePickerModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const defaultClassNames = getDefaultClassNames();
  const tripDays = useCalendarStore((s) => s.tripDays);
  const updateDateRange = useCalendarStore((s) => s.updateDateRange);

  const isWide = useIsWideScreen();
  const numberOfMonths = isWide ? 2 : 1;
  const modalWidth = isWide ? DATE_PICKER_WIDTH_LG : DATE_PICKER_WIDTH_SM;

  const [range, setRange] = useState<DateRange | undefined>();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (open && tripDays.length > 0) {
      setRange({
        from: new Date(`${tripDays[0].date}T00:00:00`),
        to: new Date(`${tripDays[tripDays.length - 1].date}T00:00:00`),
      });
      setShowWarning(false);
    }
  }, [open, tripDays]);

  const blocksToDelete = useMemo(() => {
    if (!range?.from || !range?.to) {
      return 0;
    }

    const newStart = range.from.getTime();
    const newEnd = range.to.getTime();

    let count = 0;
    for (const day of tripDays) {
      const dayTime = new Date(`${day.date}T00:00:00`).getTime();
      if (dayTime < newStart || dayTime > newEnd) {
        count += day.blocks.length;
      }
    }
    return count;
  }, [range, tripDays]);

  const isRangeComplete = range?.from && range?.to;

  const handleConfirm = () => {
    if (!range?.from || !range?.to) {
      return;
    }

    if (blocksToDelete > 0 && !showWarning) {
      setShowWarning(true);
      return;
    }

    const startDate = formatLocalDate(range.from);
    const endDate = formatLocalDate(range.to);

    updateDateRange(startDate, endDate);
    onOpenChange(false);
  };

  const handleRangeSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    setShowWarning(false);
  };

  const defaultMonth = range?.from ?? new Date();

  // biome-ignore lint/style/useNamingConvention: rdp API requires PascalCase component keys
  const calendarComponents = { Chevron: NavChevron };

  const calendarClassNames = {
    // biome-ignore lint/style/useNamingConvention: rdp API
    month_caption: `${defaultClassNames.month_caption} !text-sm !font-bold`,
    selected: `${defaultClassNames.selected} !text-sm`,
    today: `${defaultClassNames.today} !font-bold`,
    // biome-ignore lint/style/useNamingConvention: rdp API
    button_previous: `${defaultClassNames.button_previous} !rounded-lg hover:!bg-gray-100 transition-colors`,
    // biome-ignore lint/style/useNamingConvention: rdp API
    button_next: `${defaultClassNames.button_next} !rounded-lg hover:!bg-gray-100 transition-colors`,
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl flex flex-col"
          style={{
            width: modalWidth,
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
                  여행 날짜 설정
                </Text>
              </Dialog.Title>
              <Text variant="small" color="sub">
                {formatSelectedRange(range)}
              </Text>
            </div>
            <Dialog.Close asChild>
              <Button
                variant="icon"
                color="neutral"
                size="sm"
                aria-label="닫기"
                className="cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
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

          {/* Calendar */}
          <div className="px-6 py-4 text-sm">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleRangeSelect}
              locale={ko}
              numberOfMonths={numberOfMonths}
              defaultMonth={defaultMonth}
              classNames={calendarClassNames}
              components={calendarComponents}
              style={rdpStyleOverrides}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 pb-5 pt-2">
            <div className="flex-1 min-w-0">
              {showWarning && blocksToDelete > 0 && (
                <div className="flex items-center gap-2" style={{ color: "var(--warning-600)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M8 5v3.5M8 10.5v.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.134 2.5a1 1 0 011.732 0l5.196 9a1 1 0 01-.866 1.5H2.804a1 1 0 01-.866-1.5l5.196-9z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <Text variant="caption" className="text-inherit">
                    범위 밖 {blocksToDelete}개의 블록이 삭제됩니다
                  </Text>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  className="cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
                >
                  취소
                </Button>
              </Dialog.Close>
              <Button
                size="sm"
                color={showWarning && blocksToDelete > 0 ? "danger" : "primary"}
                disabled={!isRangeComplete}
                onClick={handleConfirm}
                className="cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
              >
                {showWarning && blocksToDelete > 0 ? "삭제하고 변경" : "확인"}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
