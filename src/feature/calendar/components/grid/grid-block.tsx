import { useEffect, useState } from "react";
import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS } from "../../constants";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import type { CalendarBlock } from "../../types";
import { formatBlockTime, getBlockAbsolutePosition } from "../../utils";
import { useGridBlockDrag } from "./use-grid-block-drag";

interface GridBlockProps {
  block: CalendarBlock;
}

export function GridBlock({ block }: GridBlockProps) {
  const { top, height } = getBlockAbsolutePosition(block);
  const { isDragging, position, handlers } = useGridBlockDrag(block);
  const { resizeBlock } = useCalendarBlockStore();

  const onResize = (startHour: number, endHour: number) => {
    resizeBlock(block.id, startHour, endHour);
  };

  return (
    <>
      {isDragging && <GridGhostBlock block={block} top={top} height={height} />}
      <GridDraggableBlock
        block={block}
        top={top}
        height={height}
        isDragging={isDragging}
        position={position}
        handlers={handlers}
        onResize={onResize}
      />
    </>
  );
}

interface GridGhostBlockProps {
  block: CalendarBlock;
  top: number;
  height: number;
}

function GridGhostBlock({ block, top, height }: GridGhostBlockProps) {
  return (
    <div
      className="absolute inset-x-0 rounded-md rounded-tr-none bg-canvas p-2 opacity-50 shadow-sm"
      style={{ top, height }}
    >
      <Text variant="body">{block.title}</Text>
      <Text variant="small">{formatBlockTime(block)}</Text>
    </div>
  );
}

interface GridDraggableBlockProps {
  block: CalendarBlock;
  top: number;
  height: number;
  isDragging: boolean;
  position: { x: number; y: number };
  handlers: React.ComponentProps<"div">;
  onResize: (startHour: number, endHour: number) => void;
}

function GridDraggableBlock({
  block,
  top,
  height,
  isDragging,
  position,
  handlers,
  onResize,
}: GridDraggableBlockProps) {
  const gridStartHour = HOURS[0];
  const snapToHalfHour = (hour: number) => Math.round(hour * 2) / 2;

  const [resizeHandle, setResizeHandle] = useState<"top" | "bottom" | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const [startY, setStartY] = useState(0);
  const [currentTop, setCurrentTop] = useState(top);
  const [currentHeight, setCurrentHeight] = useState(height);

  useEffect(() => {
    setCurrentTop(top);
    setCurrentHeight(height);
  }, [top, height]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // block 자체의 드래그 인터랙션 막기
    e.stopPropagation();

    setStartY(e.clientY);
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsResizing(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizing) {
      return;
    }

    const deltaY = e.clientY - startY;
    const deltaHour = deltaY / HOUR_HEIGHT;

    if (resizeHandle === "top") {
      const newStartHour = snapToHalfHour(block.startHour + deltaHour);
      const snappedTop = (newStartHour - gridStartHour) * HOUR_HEIGHT;
      const snappedHeight = (block.endHour - newStartHour) * HOUR_HEIGHT;
      setCurrentTop(snappedTop);
      setCurrentHeight(snappedHeight);
      return;
    }

    const newEndHour = snapToHalfHour(block.endHour + deltaHour);
    const snappedHeight = (newEndHour - block.startHour) * HOUR_HEIGHT;
    setCurrentHeight(snappedHeight);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newStartHour = currentTop / HOUR_HEIGHT + gridStartHour;
    const newEndHour = newStartHour + currentHeight / HOUR_HEIGHT;

    if (newEndHour <= newStartHour) {
      setCurrentTop(top);
      setCurrentHeight(height);
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsResizing(false);
      return;
    }

    onResize(newStartHour, newEndHour);

    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsResizing(false);
  };

  const resizeHandleHeight = 10;

  return (
    <div
      className="cursor-pointer touch-none rounded-md rounded-tr-none bg-canvas shadow-sm transition-shadow hover:shadow-md"
      style={{
        position: isDragging ? "fixed" : "absolute",
        inset: isDragging ? undefined : "0",
        top: isDragging ? position.y : currentTop,
        left: isDragging ? position.x : undefined,
        width: DAY_COL_MIN_W,
        height: currentHeight,
        zIndex: isDragging ? 9999 : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: isDragging ? "none" : undefined,
      }}
      {...handlers}
    >
      <div
        className="absolute inset-x-0 top-0 cursor-ns-resize bg-red-100"
        style={{ height: resizeHandleHeight }}
        onPointerDown={(e) => {
          setResizeHandle("top");
          onPointerDown(e);
        }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      {/* Content */}
      <div className="p-2" style={{ marginTop: resizeHandleHeight }}>
        <Text variant="body">{block.title}</Text>
        <Text variant="small">{formatBlockTime(block)}</Text>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 cursor-ns-resize bg-red-100"
        style={{ height: resizeHandleHeight }}
        onPointerDown={(e) => {
          setResizeHandle("bottom");
          onPointerDown(e);
        }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
}
