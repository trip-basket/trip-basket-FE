"use client";

import useCalendarStore from "../../stores/use-calendar-store";
import { BucketGrid } from "./bucket-grid";
import { BucketSidebar } from "./bucket-sidebar";
import { BucketTitleBar } from "./bucket-title-bar";
import { BUCKET_INSET, TITLE_BAR_HEIGHT, useBucketExpand } from "./use-bucket-expand";
import { useBucketFilter } from "./use-bucket-filter";

const EXPAND_EASING = "cubic-bezier(0.165, 0.84, 0.44, 1)";

export function Bucket() {
  const bucketBlocks = useCalendarStore((s) => s.bucketBlocks);

  const {
    filteredBlocks,
    selectedCategory,
    sortType,
    isCategoryExpanded,
    isCostExpanded,
    categoryCounts,
    availableCategories,
    sidebarItemCount,
    selectSort,
    toggleCategoryExpand,
    toggleCostExpand,
    selectCategory,
    clearFilter,
  } = useBucketFilter(bucketBlocks);

  const {
    isExpanded,
    isPinned,
    togglePin,
    expandedHeight,
    gridAreaWidth,
    measureRef,
    onMouseEnter,
    onMouseLeave,
  } = useBucketExpand(sidebarItemCount, filteredBlocks.length);

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
      <div className="flex flex-1 min-h-0">
        <BucketSidebar
          totalCount={bucketBlocks.length}
          selectedCategory={selectedCategory}
          sortType={sortType}
          isCategoryExpanded={isCategoryExpanded}
          isCostExpanded={isCostExpanded}
          categoryCounts={categoryCounts}
          availableCategories={availableCategories}
          onToggleCategoryExpand={toggleCategoryExpand}
          onToggleCostExpand={toggleCostExpand}
          onSelectCategory={selectCategory}
          onClearFilter={clearFilter}
          onSelectSort={selectSort}
        />
        <div className="flex-1 overflow-y-auto p-2" style={{ width: gridAreaWidth }}>
          <BucketGrid blocks={filteredBlocks} />
        </div>
      </div>
    </section>
  );
}
