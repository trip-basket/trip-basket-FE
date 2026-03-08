"use client";

import { useEffect, useState } from "react";
import { Text } from "@/src/components/ui";
import useBlockStore from "../../stores/use-block-store";
import { BucketBlock } from "./bucket-block";

const EXPAND_EASING = "cubic-bezier(0.165, 0.84, 0.44, 1)";
export const TITLE_BAR_HEIGHT = 44;
export const BUCKET_INSET = 8;

export function Bucket() {
  const bucketBlocks = useBlockStore((s) => s.bucketBlocks);
  const isBucketDragging = useBlockStore((s) => s.isBucketDragging);
  const isBucketEmpty = bucketBlocks.length === 0;

  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = (isPinned || isHovered) && !isBucketDragging;

  useEffect(() => {
    if (!isBucketDragging) {
      setIsHovered(false);
    }
  }, [isBucketDragging]);

  return (
    <section
      aria-label="담은 장소 목록"
      className="absolute z-50 flex flex-col rounded-xl"
      style={{
        bottom: BUCKET_INSET,
        left: BUCKET_INSET,
        right: BUCKET_INSET,
        height: isExpanded ? "45%" : TITLE_BAR_HEIGHT,
        backgroundColor: "var(--bg-floating)",
        boxShadow:
          "0 -1px 0 rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
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
