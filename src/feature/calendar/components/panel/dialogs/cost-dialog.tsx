"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { Button, Text } from "@/src/components/ui";

interface CostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCost: number | undefined;
  currency: string;
  onConfirm: (cost: number | undefined) => void;
}

export function CostDialog({
  open,
  onOpenChange,
  currentCost,
  currency,
  onConfirm,
}: CostDialogProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setValue(currentCost !== undefined ? String(currentCost) : "");
    }
    onOpenChange(isOpen);
  };

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleConfirm = () => {
    const trimmed = value.trim();
    const cost = trimmed === "" ? undefined : Number(trimmed);
    if (cost !== undefined && (!Number.isFinite(cost) || cost < 0)) {
      return;
    }
    onConfirm(cost);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleConfirm();
    }
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
                비용
              </Text>
            </Dialog.Title>
          </div>

          <div className="px-6 py-3">
            <div className="flex items-center gap-2">
              <Text as="span" variant="small" color="muted" className="shrink-0">
                {currency}
              </Text>
              <input
                ref={inputRef}
                type="number"
                inputMode="decimal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="금액 입력"
                className="flex-1 rounded-lg border border-outline bg-inset px-3 py-2 text-sm text-sub placeholder:text-muted focus:outline-none focus:bg-white focus:border-outline-strong transition-colors duration-150"
              />
            </div>
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
