import { useState } from "react";
import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS, MOCK_DAYS } from "../constants";
import useCalendarBlockStore from "../stores/use-calendar-block-store";
import type { Place } from "../types";

const GRID_START_HOUR = HOURS[0];

function isInsideRect(x: number, y: number, rect: DOMRect): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function getDropPosition(gridRef: HTMLDivElement, clientX: number, clientY: number) {
  const scrollContainer = gridRef.closest(".overflow-auto");
  const containerRect = scrollContainer?.getBoundingClientRect();

  // 스크롤 컨테이너 밖이면 null
  if (containerRect && !isInsideRect(clientX, clientY, containerRect)) {
    return null;
  }

  const gridRect = gridRef.getBoundingClientRect();

  // 그리드 밖이면 null
  if (!isInsideRect(clientX, clientY, gridRect)) {
    return null;
  }

  const relativeX = clientX - gridRect.left;
  const relativeY = clientY - gridRect.top;
  const columnWidth = gridRect.width / MOCK_DAYS.length;
  const dayIndex = Math.floor(relativeX / columnWidth);
  const hour = Math.floor(relativeY / HOUR_HEIGHT) + GRID_START_HOUR;

  return { dayIndex, hour };
}

export function BlockBucket() {
  const { bucketBlocks } = useCalendarBlockStore();

  return (
    <div className="flex shrink-0 rounded-xl bg-surface p-grid-gap gap-grid-gap overflow-x-auto">
      {bucketBlocks.map((place) => (
        <BucketBlock key={place.id} place={place} />
      ))}
    </div>
  );
}

function BucketBlock({ place }: { place: Place }) {
  const { gridRef, moveToCalendar } = useCalendarBlockStore();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();
    setElementStart({ x: rect.left, y: rect.top });
    setMouseStart({ x: e.clientX, y: e.clientY });
    setPosition({ x: rect.left, y: rect.top });

    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const deltaX = e.clientX - mouseStart.x;
    const deltaY = e.clientY - mouseStart.y;

    setPosition({
      x: elementStart.x + deltaX,
      y: elementStart.y + deltaY,
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const dropPosition = gridRef ? getDropPosition(gridRef, e.clientX, e.clientY) : null;

    if (!dropPosition) {
      onPointerCancel(e);
      setPosition({ x: elementStart.x, y: elementStart.y });
      return;
    }

    moveToCalendar(place, dropPosition.dayIndex, dropPosition.hour);

    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <>
      {isDragging && (
        <div
          className="shrink-0 rounded-md bg-canvas shadow-sm p-2 opacity-50"
          style={{
            width: DAY_COL_MIN_W,
            left: elementStart.x,
            top: elementStart.y,
            height: 100,
          }}
        >
          <Text variant="body">{place.title}</Text>
        </div>
      )}
      <div
        className="shrink-0 cursor-pointer rounded-md bg-canvas shadow-sm transition-shadow hover:shadow-md p-2 touch-none"
        style={{
          position: isDragging ? "fixed" : "static",
          width: DAY_COL_MIN_W,
          height: 100,
          left: isDragging ? position.x : undefined,
          top: isDragging ? position.y : undefined,
          zIndex: isDragging ? 9999 : undefined,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: isDragging ? "none" : undefined,
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerCancel={onPointerCancel}
      >
        <Text variant="body">{place.title}</Text>
      </div>
    </>
  );
}
