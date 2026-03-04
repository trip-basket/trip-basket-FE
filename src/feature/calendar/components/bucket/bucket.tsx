import { useState } from "react";
import { Text } from "@/src/components/ui";
import { TIME_COL_W } from "../../constants";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import { BucketBlock } from "./bucket-block";

export function Bucket() {
  const { bucketBlocks } = useCalendarBlockStore();
  const isBucketEmpty = bucketBlocks.length === 0;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex shrink-0 rounded-lg bg-canvas">
      {isOpen && (
        <div className="flex shrink-0 flex-col items-start justify-center gap-3 rounded-l-lg bg-inset p-grid-gap">
          <div className="flex flex-col gap-1">
            <Text variant="caption" color="main">
              담은 장소 {bucketBlocks.length}개
            </Text>
            <Text variant="caption" color="sub">
              장소들을 캘린더로 드래그 해보세요
            </Text>
          </div>
          <button
            type="button"
            className="flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs text-muted transition-colors hover:bg-surface cursor-pointer bg-elevated"
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 4h12M2 8h8M2 12h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            정렬
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex shrink-0 items-center justify-center border-r border-grid-line px-1 cursor-pointer transition-colors hover:bg-surface"
        aria-label={isOpen ? "정보 패널 접기" : "정보 패널 펼치기"}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`text-muted transition-transform ${isOpen ? "" : "rotate-180"}`}
        >
          <path
            d="M10 4l-4 4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex flex-1 gap-grid-gap overflow-x-auto p-grid-gap">
        {bucketBlocks.map((place) => (
          <BucketBlock key={place.id} place={place} />
        ))}
        {isBucketEmpty && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <Text variant="h4" weight="bold">
              가고 싶은 장소를 미리 담아두세요
            </Text>
            <Text variant="body">지도에서 버튼을 눌러 추가할 수 있어요</Text>
          </div>
        )}
      </div>
    </div>
  );
}
