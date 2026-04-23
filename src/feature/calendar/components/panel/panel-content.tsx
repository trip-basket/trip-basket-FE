"use client";

import { useCallback, useRef, useState } from "react";
import { Text } from "@/src/components/ui";
import { CATEGORY_LABELS } from "../../constants";
import type { Reaction, ScheduledBlock, TripDay } from "../../types";
import { formatBlockTime, formatCurrency, getBlockColor } from "../../utils";
import { CostDialog } from "./dialogs/cost-dialog";
import { DateTimeDialog } from "./dialogs/date-time-dialog";
import { DurationDialog } from "./dialogs/duration-dialog";
import { CategoryIcon } from "./properties/category-icon";
import { PropertyRow } from "./properties/property-row";
import { ReactionsProperty } from "./properties/reactions-property";
import { MapSection } from "./sections/map-section";
import { OpeningHoursSection } from "./sections/opening-hours-section";
import { SectionHeader } from "./sections/section-header";
import { TodoSection } from "./sections/todo-section";

function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${hours * 60}분`;
  }
  if (hours % 1 === 0) {
    return `${hours}시간`;
  }
  return `${Math.floor(hours)}시간 ${(hours % 1) * 60}분`;
}

export function PanelContent({
  block,
  day,
  onUpdateMemo,
  onUpdateDuration,
  onMoveBlock,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
  dateRange,
  currency,
}: {
  block: ScheduledBlock;
  day: TripDay | undefined;
  onUpdateMemo: (memo: string | undefined) => void;
  onUpdateDuration: (endHour: number) => void;
  onMoveBlock: (date: string, startHour: number) => void;
  onAddTodo: (text: string) => void;
  onUpdateTodo: (todoId: string, updates: { text?: string; completed?: boolean }) => void;
  onDeleteTodo: (todoId: string) => void;
  dateRange: { start: string; end: string };
  currency?: string;
}) {
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const [isDateTimeOpen, setIsDateTimeOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isCostOpen, setIsCostOpen] = useState(false);
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const blockColor = getBlockColor(block.place.category);
  const categoryColor = blockColor.accent;
  const categoryLabel = block.place.category ? CATEGORY_LABELS[block.place.category] : undefined;
  const reactions = block.reactions ?? [];
  const todos = block.todos ?? [];
  const lockedByMember = block.lockedBy;
  const duration = block.endHour - block.startHour;
  const openingHours = block.place.openingHours;
  const hasOpeningHours = openingHours != null && openingHours.length > 0;

  const handleDateTimeConfirm = useCallback(
    (date: string, startHour: number) => {
      onMoveBlock(date, startHour);
    },
    [onMoveBlock],
  );

  const handleDurationConfirm = useCallback(
    (newDuration: number) => {
      onUpdateDuration(block.startHour + newDuration);
    },
    [block.startHour, onUpdateDuration],
  );

  const handleMemoBlur = useCallback(() => {
    const value = memoRef.current?.value.trim() ?? "";
    const prev = block.memo ?? "";
    if (value !== prev) {
      onUpdateMemo(value || undefined);
    }
  }, [block.memo, onUpdateMemo]);

  // TODO: 비용 API 추가 후 연동
  const handleCostConfirm = useCallback((_cost: number | undefined) => {}, []);

  // TODO: 좋아요 API 추가 후 연동
  const handleReactionToggle = useCallback(
    (_memberId: string) => {},
    [],
  );

  const handleTodoToggle = useCallback(
    (todoId: string) => {
      const todo = todos.find((t) => t.id === todoId);
      if (todo) {
        onUpdateTodo(todoId, { completed: !todo.completed });
      }
    },
    [todos, onUpdateTodo],
  );

  const handleTodoAdd = useCallback(
    (text: string) => {
      onAddTodo(text);
    },
    [onAddTodo],
  );

  const handleTodoUpdate = useCallback(
    (todoId: string, text: string) => {
      if (!text.trim()) {
        onDeleteTodo(todoId);
        return;
      }
      onUpdateTodo(todoId, { text: text.trim() });
    },
    [onUpdateTodo, onDeleteTodo],
  );

  return (
    <div className="flex-1 overflow-y-auto px-7">
      {/* ── Block name ── */}
      <div className="pt-5 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex-1 min-w-0">
            <Text variant="h2" className="text-lg font-bold text-main leading-snug">
              {block.name}
            </Text>
            {block.place.placeName !== block.name && (
              <Text variant="small" color="muted">
                {block.place.placeName}
              </Text>
            )}
          </div>
          <div>
            {categoryLabel && (
              <Text
                as="span"
                variant="small"
                weight="medium"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `color-mix(in srgb, ${categoryColor} 15%, transparent)`,
                  color: categoryColor,
                }}
              >
                <CategoryIcon category={block.place.category} color={categoryColor} size={12} />
                {categoryLabel}
              </Text>
            )}
          </div>
        </div>
      </div>

      {/* ── Properties ── */}
      <div className="pb-6 space-y-0.5">
        <PropertyRow icon="calendarToday" label="날짜" onClick={() => setIsDateTimeOpen(true)}>
          <Text variant="small">
            {day ? `${day.dateNum}일 (${day.dayOfWeek})` : ""} {formatBlockTime(block)}
          </Text>
        </PropertyRow>

        <PropertyRow icon="schedule" label="소요시간" onClick={() => setIsDurationOpen(true)}>
          <Text variant="small" color="muted">
            {formatDuration(duration)}
          </Text>
        </PropertyRow>

        <PropertyRow icon="payments" label="비용" onClick={() => setIsCostOpen(true)}>
          <Text variant="small">
            {block.cost !== undefined ? formatCurrency(block.cost, currency) : "미정"}
          </Text>
        </PropertyRow>

        <ReactionsProperty reactions={reactions} onToggle={handleReactionToggle} />

        {lockedByMember && (
          <PropertyRow icon="lock" label="편집 중">
            <Text variant="small" color="muted">
              {lockedByMember}
            </Text>
          </PropertyRow>
        )}
      </div>

      {/* ── 위치 ── */}
      <div className="pb-6">
        <SectionHeader icon="place" label="위치" />
        <MapSection block={block} />

        {hasOpeningHours && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setIsHoursOpen((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-medium text-soft hover:text-sub transition-colors duration-150 cursor-pointer"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              <Text as="span" variant="caption">
                운영시간
              </Text>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`transition-transform duration-200 ${isHoursOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
              </svg>
            </button>
            <div
              className="overflow-hidden transition-[max-height] duration-200 ease-out"
              style={{ maxHeight: isHoursOpen ? "300px" : "0" }}
            >
              <div className="pt-2">
                <OpeningHoursSection hours={openingHours} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 메모 ── */}
      <div className="pb-6">
        <SectionHeader icon="editNote" label="메모" />
        <textarea
          ref={memoRef}
          className="w-full resize-none rounded-lg border border-outline bg-inset px-3 py-2.5 text-sm text-sub leading-relaxed placeholder:text-muted focus:placeholder:text-transparent focus:outline-none focus:bg-white focus:border-outline-strong transition-colors duration-150"
          rows={3}
          placeholder="메모를 입력하세요"
          defaultValue={block.memo ?? ""}
          onBlur={handleMemoBlur}
        />
      </div>

      {/* ── 할 일 ── */}
      <div className="pb-7">
        <SectionHeader icon="checklist" label="할 일" />
        <TodoSection
          todos={todos}
          onToggle={handleTodoToggle}
          onUpdate={handleTodoUpdate}
          onAdd={handleTodoAdd}
        />
      </div>

      {/* ── Dialogs ── */}
      {day && (
        <DateTimeDialog
          open={isDateTimeOpen}
          onOpenChange={setIsDateTimeOpen}
          currentDate={day.date}
          currentStartHour={block.startHour}
          duration={duration}
          dateRange={dateRange}
          onConfirm={handleDateTimeConfirm}
        />
      )}

      <DurationDialog
        open={isDurationOpen}
        onOpenChange={setIsDurationOpen}
        currentDuration={duration}
        onConfirm={handleDurationConfirm}
      />

      <CostDialog
        open={isCostOpen}
        onOpenChange={setIsCostOpen}
        currentCost={block.cost}
        currency={currency ?? "₩"}
        onConfirm={handleCostConfirm}
      />
    </div>
  );
}
