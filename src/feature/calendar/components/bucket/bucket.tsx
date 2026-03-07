"use client";

import { useState } from "react";
import { Text } from "@/src/components/ui";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import { BucketBlock } from "./bucket-block";

// ease-out-quart (Interaction Design: 강한 감속, modal/sheet 패턴)
const EXPAND_EASING = "cubic-bezier(0.165, 0.84, 0.44, 1)";
const TITLE_BAR_HEIGHT = 44;

export function Bucket() {
  const { bucketBlocks } = useCalendarBlockStore();
  const isBucketEmpty = bucketBlocks.length === 0;

  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isPinned || isHovered;

  return (
    <section
      aria-label="담은 장소 목록"
      className="absolute bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl border-t border-black/5"
      style={{
        height: isExpanded ? "45%" : TITLE_BAR_HEIGHT,
        backgroundColor: "var(--bg-floating)",
        boxShadow: "var(--shadow-floating)",
        transition: `height 250ms ${EXPAND_EASING}`,
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 타이틀바 — 44px 터치 타겟 */}
      <div
        className="flex shrink-0 items-center justify-between px-4"
        style={{ height: TITLE_BAR_HEIGHT }}
      >
        <div className="flex items-center gap-2">
          {/* 확장 인디케이터 */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="text-tertiary"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: `transform 250ms ${EXPAND_EASING}`,
            }}
          >
            <path
              d="M2.5 7.5L6 4.5L9.5 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text variant="caption" weight="semibold">
            담은 장소 {bucketBlocks.length}개
          </Text>
        </div>
        <button
          type="button"
          onClick={() => setIsPinned(!isPinned)}
          className="flex items-center justify-center rounded-md transition-colors hover:bg-black/5"
          style={{
            width: 28,
            height: 28,
            color: isPinned ? "var(--bg-accent)" : "var(--text-tertiary)",
          }}
          aria-label={isPinned ? "버킷 고정 해제" : "버킷 고정"}
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

      {/* 블록 그리드 — 기존 카드 형태 유지 */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
        {isBucketEmpty ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Text variant="body" weight="semibold">
              가고 싶은 장소를 미리 담아두세요
            </Text>
            <Text variant="caption" color="muted">
              지도에서 버튼을 눌러 추가할 수 있어요
            </Text>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {bucketBlocks.map((place) => (
              <BucketBlock key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
