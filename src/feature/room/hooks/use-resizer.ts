import { type RefObject, useCallback, useRef, useState } from "react";

interface UseResizerOptions {
  min?: number;
  max?: number;
  initial?: number;
}

export function useResizer({ min = 0.25, max = 0.75, initial = 0.7 }: UseResizerOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(initial);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);

      const container = containerRef.current;
      if (!container) {
        return;
      }

      const onMove = (ev: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (ev.clientX - rect.left) / rect.width;
        setRatio(Math.min(max, Math.max(min, x)));
      };

      const onUp = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
    },
    [min, max],
  );

  return { containerRef: containerRef as RefObject<HTMLDivElement>, ratio, onPointerDown };
}
