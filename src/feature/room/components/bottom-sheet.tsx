"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SHEET_HEIGHT = 90; // vh
const CLOSE_THRESHOLD = 0.4;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // double RAF pattern
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
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

      const onMove = (ev: PointerEvent) => {
        const delta = ev.clientY - startY;
        setDragOffset(Math.max(0, delta));
      };

      const onUp = (ev: PointerEvent) => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        setIsDragging(false);

        const sheetHeight = window.innerHeight * (SHEET_HEIGHT / 100);
        const delta = ev.clientY - startY;

        if (delta > sheetHeight * CLOSE_THRESHOLD) {
          onClose();
        }
        setDragOffset(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
    },
    [onClose],
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* 백드롭 */}
      <div
        role="presentation"
        aria-hidden="true"
        className="absolute inset-0 bg-black/30 transition-opacity duration-300 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />

      {/* 시트 */}
      <div
        ref={sheetRef}
        onTransitionEnd={onTransitionEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        className={`absolute bottom-0 inset-x-0 bg-white rounded-t-2xl flex flex-col ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
        style={{
          height: `${SHEET_HEIGHT}vh`,
          transform: visible ? `translateY(${dragOffset}px)` : `translateY(100%)`,
        }}
      >
        {/* 드래그 핸들 */}
        <div
          onPointerDown={onPointerDown}
          className="shrink-0 flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
