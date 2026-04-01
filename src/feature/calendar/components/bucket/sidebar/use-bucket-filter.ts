import { useMemo, useState } from "react";
import type { BucketBlock, PlaceCategory } from "../../../types";

export type BucketSortType = "addedAt" | "costAsc" | "costDesc" | "name";

const ALL_CATEGORIES: PlaceCategory[] = [
  "sightseeing",
  "food",
  "shopping",
  "transport",
  "accommodation",
  "activity",
  "other",
];

export function useBucketFilter(blocks: BucketBlock[]) {
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | null>(null);
  const [sortType, setSortType] = useState<BucketSortType>("addedAt");
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [isCostExpanded, setIsCostExpanded] = useState(false);

  const filteredAndSortedBlocks = useMemo(() => {
    let result = [...blocks];

    if (selectedCategory) {
      result = result.filter((b) => b.place.category === selectedCategory);
    }

    switch (sortType) {
      case "costAsc":
        result.sort((a, b) => {
          if (a.cost === undefined) {
            return 1;
          }
          if (b.cost === undefined) {
            return -1;
          }
          return a.cost - b.cost;
        });
        break;
      case "costDesc":
        result.sort((a, b) => {
          if (a.cost === undefined) {
            return 1;
          }
          if (b.cost === undefined) {
            return -1;
          }
          return b.cost - a.cost;
        });
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name, "ko"));
        break;
      default:
        result.sort((a, b) => (a.addedAt ?? "").localeCompare(b.addedAt ?? ""));
        break;
    }

    return result;
  }, [blocks, selectedCategory, sortType]);

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<PlaceCategory, number>> = {};
    for (const block of blocks) {
      const cat = block.place.category;
      if (cat) {
        counts[cat] = (counts[cat] ?? 0) + 1;
      }
    }
    return counts;
  }, [blocks]);

  const availableCategories = useMemo(
    () => ALL_CATEGORIES.filter((cat) => categoryCounts[cat]),
    [categoryCounts],
  );

  const toggleCategoryExpand = () => {
    if (isCategoryExpanded) {
      setSelectedCategory(null);
    }
    setIsCategoryExpanded((prev) => !prev);
  };

  const selectCategory = (category: PlaceCategory) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    setIsCategoryExpanded(false);
  };

  const toggleCostExpand = () => {
    if (isCostExpanded && (sortType === "costAsc" || sortType === "costDesc")) {
      setSortType("addedAt");
    }
    setIsCostExpanded((prev) => !prev);
  };

  const selectSort = (type: BucketSortType) => {
    setSortType(type);
    if (type !== "costAsc" && type !== "costDesc") {
      setIsCostExpanded(false);
    }
  };

  const sidebarItemCount =
    5 + (isCategoryExpanded ? availableCategories.length : 0) + (isCostExpanded ? 2 : 0);

  return {
    filteredBlocks: filteredAndSortedBlocks,
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
  };
}
