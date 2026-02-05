import { useState } from "react";
import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W, MOCK_BLOCKS } from "../constants";
import { type Block, formatBlockTime } from "../types/block";

export function BlockBucket() {
  return (
    <div className="flex shrink-0 rounded-xl bg-surface p-grid-gap gap-grid-gap overflow-x-auto">
      {MOCK_BLOCKS.map((block) => (
        <BucketBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function BucketBlock({ block }: { block: Block }) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 }); // fixed position

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
          className="shrink-0 rounded-md bg-canvas shadow-sm transition-shadow hover:shadow-md p-2 opacity-50"
          style={{
            width: DAY_COL_MIN_W,
            left: elementStart.x,
            top: elementStart.y,
            height: 100,
          }}
        >
          <Text variant="body">{block.title}</Text>
          <Text variant="small">{formatBlockTime(block)}</Text>
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
          userSelect: isDragging ? "none" : undefined, // 드래그 시 텍스트 선택 방지
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerCancel={onPointerCancel}
      >
        <Text variant="body">{block.title}</Text>
        <Text variant="small">{formatBlockTime(block)}</Text>
      </div>
    </>
  );
}
