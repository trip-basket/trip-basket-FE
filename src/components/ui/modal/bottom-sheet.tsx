"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import type { ModalStore } from "./modal-store";

const CLOSE_THRESHOLD = 0.4;

interface BottomSheetProps {
  modalRef: ModalStore;
  children: React.ReactNode;
}

export function BottomSheet({ modalRef, children }: BottomSheetProps) {
  const { isOpen, close } = useStore(modalRef);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);

      // double RAF pattern
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });

      return;
    }

    setVisible(false);
  }, [isOpen]);

  const onTransitionEnd = () => {
    if (!visible) {
      setMounted(false);
    }
  };

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);
      setIsDragging(true);

      const startY = e.clientY;
      const sheetHeight = sheetRef.current?.offsetHeight ?? 0;

      const onClear = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onCancelled);
        setIsDragging(false);
        setDragOffset(0);
      };

      const onMove = (ev: PointerEvent) => {
        const delta = ev.clientY - startY;
        setDragOffset(Math.max(0, delta));
      };

      const onUp = (ev: PointerEvent) => {
        onClear();

        const delta = ev.clientY - startY;

        if (delta > sheetHeight * CLOSE_THRESHOLD) {
          close();
        }
      };

      const onCancelled = () => onClear();

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onCancelled);
    },
    [close],
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        role="presentation"
        aria-hidden="true"
        className="absolute inset-0 bg-black/30 transition-opacity duration-300 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={close}
      />

      <div
        ref={sheetRef}
        onTransitionEnd={onTransitionEnd}
        role="dialog"
        aria-modal="true"
        className={`absolute bottom-0 inset-x-0 max-h-[90vh] bg-white rounded-t-2xl flex flex-col ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
        style={{
          transform: visible ? `translateY(${dragOffset}px)` : "translateY(100%)",
        }}
      >
        <div
          onPointerDown={onPointerDown}
          className="shrink-0 flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        <div className="flex-1 min-h-0 overscroll-contain">{children}</div>
      </div>
    </div>
  );
}
