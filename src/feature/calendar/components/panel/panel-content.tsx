import { Text } from "@/src/components/ui";
import type { Member } from "@/src/feature/room/types";
import { CATEGORY_LABELS } from "../../constants";
import type { BlockTodo, CalendarBlock, TripDay } from "../../types";
import { formatBlockTime, formatCurrency, getBlockColor } from "../../utils";
import { CategoryIcon } from "./category-icon";
import { MapSection } from "./map-section";
import { OpeningHoursSection } from "./opening-hours-section";
import { PropertyRow } from "./property-row";
import { ReactionsProperty } from "./reactions-property";
import { SectionHeader } from "./section-header";
import { TodoSection } from "./todo-section";

export function PanelContent({
  block,
  day,
  todos,
  reactionMembers,
  members,
  currency,
}: {
  block: CalendarBlock;
  day: TripDay | undefined;
  todos: BlockTodo[];
  reactionMembers: Member[];
  members: Member[];
  currency?: string;
}) {
  const blockColor = getBlockColor(block.colorIndex);
  const categoryColor = blockColor.accent;
  const categoryLabel = block.category ? CATEGORY_LABELS[block.category] : undefined;
  const reactionsCount = block.reactions?.length ?? 0;
  const lockedByMember = block.lockedBy ? members.find((m) => m.id === block.lockedBy) : undefined;

  return (
    <div className="flex-1 overflow-y-auto px-10 pb-6">
      {/* Title area */}
      <div className="mb-6">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg mb-3"
          style={{ backgroundColor: `${categoryColor}15` }}
        >
          <CategoryIcon category={block.category} color={categoryColor} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-0.5">{block.title}</h1>
        {block.placeDetail && block.placeDetail.placeName !== block.title && (
          <p className="text-sm text-gray-400">{block.placeDetail.placeName}</p>
        )}
      </div>

      {/* Properties table */}
      <div className="mb-6 space-y-0.5">
        <PropertyRow icon="calendarToday" label="날짜">
          <Text variant="small">
            {day ? `${day.dateNum}일 (${day.dayOfWeek})` : ""} {formatBlockTime(block)}
          </Text>
        </PropertyRow>

        {categoryLabel && (
          <PropertyRow icon="label" label="카테고리">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium"
              style={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
              }}
            >
              {categoryLabel}
            </span>
          </PropertyRow>
        )}

        <PropertyRow icon="payments" label="비용">
          <Text variant="small">
            {block.cost !== undefined ? formatCurrency(block.cost, currency) : "미정"}
          </Text>
        </PropertyRow>

        <ReactionsProperty members={reactionMembers} reactionsCount={reactionsCount} />

        {lockedByMember && (
          <PropertyRow icon="lock" label="편집 중">
            <Text variant="small" color="muted">
              {lockedByMember.nickname}
            </Text>
          </PropertyRow>
        )}
      </div>

      <div className="h-px bg-gray-100 mb-6" />

      <MapSection block={block} />

      {block.placeDetail?.openingHours && block.placeDetail.openingHours.length > 0 && (
        <OpeningHoursSection hours={block.placeDetail.openingHours} />
      )}

      {block.memo && (
        <div className="mb-6">
          <SectionHeader icon="edit_note" label="메모" />
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{block.memo}</p>
        </div>
      )}

      {todos.length > 0 && <TodoSection todos={todos} />}
    </div>
  );
}
