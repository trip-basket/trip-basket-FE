"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import { Button, Text } from "@/src/components/ui";

function generateDurationSlots(maxHours: number): { label: string; value: string }[] {
  const slots: { label: string; value: string }[] = [];
  const maxStep = Math.floor(maxHours / 0.5);
  for (let i = 1; i <= maxStep; i++) {
    const hours = i * 0.5;
    let label: string;
    if (hours < 1) {
      label = `${hours * 60}분`;
    } else if (hours % 1 === 0) {
      label = `${hours}시간`;
    } else {
      label = `${Math.floor(hours)}시간 ${(hours % 1) * 60}분`;
    }
    slots.push({ label, value: String(hours) });
  }
  return slots;
}

interface DurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDuration: number;
  maxDuration?: number;
  onConfirm: (duration: number) => void;
}

export function DurationDialog({
  open,
  onOpenChange,
  currentDuration,
  maxDuration = 12,
  onConfirm,
}: DurationDialogProps) {
  const [selected, setSelected] = useState(String(currentDuration));
  const slots = generateDurationSlots(maxDuration);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setSelected(String(currentDuration));
    }
    onOpenChange(isOpen);
  };

  const handleConfirm = () => {
    const duration = Number(selected);
    if (!Number.isFinite(duration) || duration <= 0 || duration > maxDuration) {
      return;
    }
    onConfirm(duration);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-[60]" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white rounded-2xl w-full max-w-xs flex flex-col"
          style={{
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.08)",
          }}
          aria-describedby={undefined}
        >
          <div className="px-6 pt-5 pb-2">
            <Dialog.Title asChild>
              <Text variant="body" weight="bold">
                소요시간
              </Text>
            </Dialog.Title>
          </div>

          <div className="px-6 py-3">
            <Select.Root value={selected} onValueChange={setSelected}>
              <Select.Trigger className="inline-flex items-center justify-between w-full rounded-lg border border-outline bg-inset px-3 py-2 text-sm text-sub hover:bg-hover transition-colors duration-150 cursor-pointer">
                <Select.Value />
                <Select.Icon>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-muted"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                  </svg>
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  className="bg-white rounded-lg border border-outline shadow-lg overflow-hidden z-[70]"
                  position="popper"
                  sideOffset={4}
                >
                  <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                    </svg>
                  </Select.ScrollUpButton>
                  <Select.Viewport className="p-1 max-h-[200px]">
                    {slots.map((slot) => (
                      <Select.Item
                        key={slot.value}
                        value={slot.value}
                        className="relative flex items-center px-3 py-1.5 text-sm rounded-md cursor-pointer select-none data-[highlighted]:bg-hover data-[state=checked]:font-medium data-[state=checked]:text-[var(--text-accent)] outline-none"
                      >
                        <Select.ItemText>{slot.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex items-center justify-end gap-2 px-6 pb-5 pt-2">
            <Dialog.Close asChild>
              <Button variant="borderless" size="sm" className="cursor-pointer">
                취소
              </Button>
            </Dialog.Close>
            <Button variant="confirm" size="sm" onClick={handleConfirm} className="cursor-pointer">
              확인
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
