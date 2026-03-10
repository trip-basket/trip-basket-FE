"use client";

import useCalendarStore from "../../stores/use-calendar-store";
import { BucketGrid } from "./bucket-grid";
import { BucketTitleBar } from "./bucket-title-bar";
import { BUCKET_INSET, TITLE_BAR_HEIGHT, useBucketExpand } from "./use-bucket-expand";

const EXPAND_EASING = "cubic-bezier(0.165, 0.84, 0.44, 1)";

export function Bucket() {
  const bucketBlocks = useCalendarStore((s) => s.bucketBlocks);
  const {
    isExpanded,
    isPinned,
    togglePin,
    expandedHeight,
    colsPerRow,
    measureRef,
    onMouseEnter,
    onMouseLeave,
  } = useBucketExpand();

  return (
    <section
      ref={measureRef}
      aria-label="담은 장소 목록"
      className="absolute z-50 flex flex-col rounded-xl"
      style={{
        bottom: BUCKET_INSET,
        left: BUCKET_INSET,
        right: BUCKET_INSET,
        height: isExpanded ? expandedHeight : TITLE_BAR_HEIGHT,
        backgroundColor: "var(--bg-primary)",
        boxShadow:
          "0 -1px 0 rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        transition: `height 250ms ${EXPAND_EASING}`,
        overflow: "hidden",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <BucketTitleBar
        blockCount={bucketBlocks.length}
        isExpanded={isExpanded}
        isPinned={isPinned}
        onTogglePin={togglePin}
      />
      <div className="flex-1 min-h-0 overflow-y-auto p-2">
        <BucketGrid blocks={bucketBlocks} colsPerRow={colsPerRow} />
      </div>
    </section>
  );
}
