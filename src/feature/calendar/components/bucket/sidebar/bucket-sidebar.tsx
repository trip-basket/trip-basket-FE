import { BLOCK_COLORS, CATEGORY_COLOR, CATEGORY_LABELS } from "../../../constants";
import type { PlaceCategory } from "../../../types";
import {
  ClockIcon,
  CostSortIcon,
  GridIcon,
  NameSortIcon,
  SortAscIcon,
  SortDescIcon,
  TagIcon,
} from "./sidebar-icons";
import { ExpandableSection, SidebarItem } from "./sidebar-item";
import type { BucketSortType } from "./use-bucket-filter";

export const SIDEBAR_MIN_WIDTH = 180;

interface BucketSidebarProps {
  totalCount: number;
  selectedCategory: PlaceCategory | null;
  sortType: BucketSortType;
  isCategoryExpanded: boolean;
  isCostExpanded: boolean;
  categoryCounts: Partial<Record<PlaceCategory, number>>;
  availableCategories: PlaceCategory[];
  onToggleCategoryExpand: () => void;
  onToggleCostExpand: () => void;
  onSelectCategory: (category: PlaceCategory) => void;
  onClearFilter: () => void;
  onSelectSort: (type: BucketSortType) => void;
}

export function BucketSidebar({
  totalCount,
  selectedCategory,
  sortType,
  isCategoryExpanded,
  isCostExpanded,
  categoryCounts,
  availableCategories,
  onToggleCategoryExpand,
  onToggleCostExpand,
  onSelectCategory,
  onClearFilter,
  onSelectSort,
}: BucketSidebarProps) {
  return (
    <nav
      className="flex flex-col overflow-y-auto border-r py-1"
      style={{
        width: SIDEBAR_MIN_WIDTH,
        borderColor: "var(--border-primary)",
      }}
    >
      {/* Filter: 전체 */}
      <SidebarItem
        label="전체"
        icon={<GridIcon />}
        isSelected={!selectedCategory && !isCategoryExpanded}
        onClick={onClearFilter}
        count={totalCount}
      />

      {/* Filter: 카테고리 (expandable) */}
      <SidebarItem
        label="카테고리"
        icon={<TagIcon />}
        isSelected={isCategoryExpanded && !selectedCategory}
        onClick={onToggleCategoryExpand}
        hasChevron
        isExpanded={isCategoryExpanded}
      />
      <ExpandableSection isExpanded={isCategoryExpanded} itemCount={availableCategories.length}>
        {availableCategories.map((cat) => (
          <SidebarItem
            key={cat}
            label={CATEGORY_LABELS[cat]}
            icon={
              <span
                className="inline-block rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: BLOCK_COLORS[CATEGORY_COLOR[cat]].accent,
                }}
              />
            }
            isSelected={selectedCategory === cat}
            onClick={() => onSelectCategory(cat)}
            count={categoryCounts[cat]}
            indent
          />
        ))}
      </ExpandableSection>

      {/* Sort: 비용 (expandable) */}
      <SidebarItem
        label="비용"
        icon={<CostSortIcon />}
        isSelected={isCostExpanded && sortType !== "costAsc" && sortType !== "costDesc"}
        onClick={onToggleCostExpand}
        hasChevron
        isExpanded={isCostExpanded}
      />
      <ExpandableSection isExpanded={isCostExpanded} itemCount={2}>
        <SidebarItem
          label="비용 낮은 순"
          icon={<SortAscIcon />}
          isSelected={sortType === "costAsc"}
          onClick={() => onSelectSort("costAsc")}
          indent
        />
        <SidebarItem
          label="비용 높은 순"
          icon={<SortDescIcon />}
          isSelected={sortType === "costDesc"}
          onClick={() => onSelectSort("costDesc")}
          indent
        />
      </ExpandableSection>

      {/* Sort: 이름순 */}
      <SidebarItem
        label="이름순"
        icon={<NameSortIcon />}
        isSelected={sortType === "name"}
        onClick={() => onSelectSort("name")}
      />

      {/* Sort: 추가된 순 */}
      <SidebarItem
        label="추가된 순"
        icon={<ClockIcon />}
        isSelected={sortType === "addedAt"}
        onClick={() => onSelectSort("addedAt")}
      />
    </nav>
  );
}
