import { useCallback, useMemo, useState } from "react";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS } from "../../constants";
import useCalendarStore from "../../stores/use-calendar-store";
import type { ScheduledBlock } from "../../types";
import { DEFAULT_BLOCK_DURATION } from "../../types";
import { computeOverlapLayout } from "../../utils";
import { AddDateGridColumn } from "../add-date-column";
import { CreateBlockModal } from "../create-block-modal";
import { GridBlock } from "./block/grid-block";

const gridHeight = HOURS.length * HOUR_HEIGHT;
const gridStartHour = HOURS[0];

interface CreateBlockTarget {
  date: string;
  startHour: number;
}

export function TimeGrid() {
  const tripDays = useCalendarStore((s) => s.tripDays);

  const [createTarget, setCreateTarget] = useState<CreateBlockTarget | null>(null);

  const handleGridClick = useCallback((date: string, startHour: number) => {
    setCreateTarget({ date, startHour });
  }, []);

  return (
    <>
      <div
        className="relative flex"
        style={{
          height: gridHeight,
          backgroundColor: "rgba(0, 0, 0, 0.015)",
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.07) 1.3px, transparent 1.3px)",
          backgroundSize: `${HOUR_HEIGHT / 2}px ${HOUR_HEIGHT / 2}px`,
        }}
      >
        <HourLines />
        <AddDateGridColumn position="left" />
        <GridArea>
          {tripDays.map((day) => (
            <DayColumn
              key={day.date}
              date={day.date}
              blocks={day.blocks}
              onGridClick={handleGridClick}
            />
          ))}
        </GridArea>
        <AddDateGridColumn position="right" />
      </div>

      {createTarget !== null && (
        <CreateBlockModal
          key={`${createTarget.date}-${createTarget.startHour}`}
          open
          onOpenChange={(open) => {
            if (!open) {
              setCreateTarget(null);
            }
          }}
          date={createTarget.date}
          defaultStartHour={createTarget.startHour}
        />
      )}
    </>
  );
}

function GridArea({ children }: { children: React.ReactNode }) {
  const setGridRef = useCalendarStore((s) => s.setGridRef);

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      // Mobile/Desktop 둘 다 마운트되므로, hidden 상태의 ref는 무시
      if (node && node.offsetParent === null) {
        return;
      }
      setGridRef(node);
    },
    [setGridRef],
  );

  return (
    <div ref={refCallback} className="flex flex-1">
      {children}
    </div>
  );
}

function HourLines() {
  return (
    <>
      {HOURS.map((hour) => (
        <div
          key={`line-${hour}`}
          className="pointer-events-none absolute inset-x-0 border-b border-grid-line"
          style={{ top: (hour - gridStartHour + 1) * HOUR_HEIGHT }}
        />
      ))}
    </>
  );
}

function DayColumn({
  date,
  blocks,
  onGridClick,
}: {
  date: string;
  blocks: ScheduledBlock[];
  onGridClick: (date: string, startHour: number) => void;
}) {
  const overlapMap = useMemo(() => computeOverlapLayout(blocks), [blocks]);
  const [hoverHour, setHoverHour] = useState<number | null>(null);

  const hasBlockAt = useCallback(
    (hour: number) => {
      const ghostEnd = hour + DEFAULT_BLOCK_DURATION;
      return blocks.some((b) => b.startHour < ghostEnd && b.endHour > hour);
    },
    [blocks],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const rawHour = gridStartHour + relativeY / HOUR_HEIGHT;
      const snapped = Math.floor(rawHour); // 1시간 단위 스냅
      setHoverHour(hasBlockAt(snapped) ? null : snapped);
    },
    [hasBlockAt],
  );

  const handlePointerLeave = useCallback(() => {
    setHoverHour(null);
  }, []);

  const handleClick = useCallback(() => {
    if (hoverHour !== null && !hasBlockAt(hoverHour)) {
      onGridClick(date, hoverHour);
      setHoverHour(null);
    }
  }, [hoverHour, date, onGridClick, hasBlockAt]);

  const ghostTop = hoverHour !== null ? (hoverHour - gridStartHour) * HOUR_HEIGHT : 0;
  const ghostHeight = DEFAULT_BLOCK_DURATION * HOUR_HEIGHT;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: 캘린더 그리드의 포인터 기반 인터랙션
    // biome-ignore lint/a11y/noStaticElementInteractions: 캘린더 그리드의 포인터 기반 인터랙션
    <div
      className="relative flex-1 border-l border-grid-line cursor-pointer"
      style={{ minWidth: DAY_COL_MIN_W, height: gridHeight }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {blocks.map((block) => (
        <GridBlock key={block.id} block={block} overlapLayout={overlapMap.get(block.id)} />
      ))}

      {hoverHour !== null && (
        <div
          className="absolute inset-x-1 rounded-xl pointer-events-none cursor-pointer bg-action/8 flex items-center justify-center"
          style={{ top: ghostTop, height: ghostHeight }}
        >
          <svg className="absolute inset-0 w-full h-full text-action/40" aria-hidden="true">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="11"
              ry="11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 5"
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-action/60 relative"
          >
            <path
              d="M10 4v12M4 10h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
