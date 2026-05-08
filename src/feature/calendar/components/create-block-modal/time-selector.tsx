"use client";

import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { Button, Text } from "@/src/components/ui";
import { HOURS } from "../../constants";
import { formatHour } from "../../utils";

interface TimeSelectorProps {
  startHour: number;
  endHour: number;
  onStartHourChange: (hour: number) => void;
  onEndHourChange: (hour: number) => void;
}

function TimePickerButton({
  label,
  hour,
  onSelect,
  filterHours,
}: {
  label: string;
  hour: number;
  onSelect: (hour: number) => void;
  filterHours?: (h: number) => boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <Text variant="caption" color="soft">
        {label}
      </Text>
      <Popover.Root open={open} onOpenChange={setOpen} modal>
        <Popover.Trigger asChild>
          <Button
            variant="bordered"
            size="sm"
            className="justify-center min-w-[100px] cursor-pointer"
          >
            {formatHour(hour)}
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onWheel={(e) => e.stopPropagation()}
            className="z-[60] bg-white rounded-xl shadow-xl border border-outline w-[120px] overflow-hidden animate-in fade-in-0 zoom-in-95"
            style={{ maxHeight: 250 }}
          >
            <div
              className="overflow-y-auto overscroll-contain p-1.5"
              style={{ maxHeight: 250 }}
              onWheel={(e) => e.stopPropagation()}
            >
              {HOURS.filter((h) => !filterHours || filterHours(h)).map((h) => (
                <Button
                  key={h}
                  variant="borderless"
                  size="sm"
                  className="w-full justify-start text-sub hover:text-main cursor-pointer"
                  onClick={() => {
                    onSelect(h);
                    setOpen(false);
                  }}
                >
                  {formatHour(h)}
                </Button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export function TimeSelector({
  startHour,
  endHour,
  onStartHourChange,
  onEndHourChange,
}: TimeSelectorProps) {
  const hasLaterHour = (hour: number) => HOURS.some((candidate) => candidate > hour);
  const getNextHour = (hour: number) => HOURS.find((candidate) => candidate > hour);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-3">
        <TimePickerButton
          label="시작"
          hour={startHour}
          filterHours={hasLaterHour}
          onSelect={(h) => {
            onStartHourChange(h);
            if (h >= endHour) {
              const next = getNextHour(h);
              if (next !== undefined) {
                onEndHourChange(next);
              }
            }
          }}
        />
        <Text variant="small" color="soft" className="pb-2">
          ~
        </Text>
        <TimePickerButton
          label="종료"
          hour={endHour}
          onSelect={onEndHourChange}
          filterHours={(h) => h > startHour}
        />
      </div>
    </div>
  );
}
