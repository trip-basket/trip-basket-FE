"use client";

import { useState } from "react";
import { Text } from "@/src/components/ui";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import { BucketBlock } from "./bucket-block";

const COLLAPSED_HEIGHT = 120;

export function Bucket() {
  const { bucketBlocks } = useCalendarBlockStore();
  const isBucketEmpty = bucketBlocks.length === 0;

  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isPinned || isHovered;

  return (
    <section
      aria-label="담은 장소 목록"
      className="absolute bottom-0 left-0 right-0 z-20 flex flex-col border-t border-black/5 rounded-t-xl"
      style={{
        maxHeight: isExpanded ? "40%" : COLLAPSED_HEIGHT,
        backgroundColor: "var(--bg-floating)",
        boxShadow: "var(--shadow-floating)",
        transition: "max-height 200ms ease-out",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 타이틀바 */}
      <div className="flex shrink-0 items-center justify-between px-4 py-2.5">
        <Text variant="caption" weight="semibold">
          담은 장소 {bucketBlocks.length}개
        </Text>
        <button
          type="button"
          onClick={() => setIsPinned(!isPinned)}
          className="flex items-center justify-center w-7 h-7 rounded-md transition-colors hover:bg-black/5"
          aria-label={isPinned ? "버킷 고정 해제" : "버킷 고정"}
          style={{ color: isPinned ? "var(--bg-accent)" : "var(--text-tertiary)" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M9.5 1.5L14.5 6.5L10 11L8 13L3 8L5 6L9.5 1.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isPinned ? "currentColor" : "none"}
            />
            <path d="M1 15L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 아이템 리스트 */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-3">
        {isBucketEmpty ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Text variant="body" weight="semibold">
              가고 싶은 장소를 미리 담아두세요
            </Text>
            <Text variant="caption" color="muted">
              지도에서 버튼을 눌러 추가할 수 있어요
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {bucketBlocks.map((place) => (
              <BucketBlock key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
