import { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "@/src/components/ui";
import type { BlockTodo } from "../../../types";

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6.5L4.5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TodoCheckbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={checked ? "할 일 완료 해제" : "할 일 완료"}
      aria-pressed={checked}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`flex items-center justify-center w-[18px] h-[18px] rounded-md shrink-0 mt-px transition-colors duration-150 cursor-pointer ${
        checked
          ? "bg-[var(--bg-accent)] text-white"
          : "border border-outline-strong text-transparent hover:border-outline-strong"
      }`}
    >
      <CheckIcon />
    </button>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: {
  todo: BlockTodo;
  onToggle: () => void;
  onUpdate: (text: string) => void;
  onDelete: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const value = inputRef.current?.value ?? "";
    onUpdate(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  const handleEditStart = useCallback(() => setIsEditing(true), []);

  if (isEditing) {
    return (
      <li className="flex items-start gap-2.5 py-1.5 -mx-1.5 px-1.5">
        <TodoCheckbox checked={todo.completed} onClick={onToggle} />
        <input
          ref={inputRef}
          type="text"
          defaultValue={todo.text}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm text-sub leading-snug bg-transparent outline-none border-b border-outline-strong focus:border-action"
        />
      </li>
    );
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <li
      className="flex items-start gap-2.5 py-1.5 group hover:bg-hover rounded-lg -mx-1.5 px-1.5 transition-colors duration-100 cursor-pointer"
      onClick={handleEditStart}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleEditStart();
        }
      }}
    >
      <TodoCheckbox checked={todo.completed} onClick={onToggle} />
      <Text
        as="span"
        variant="small"
        color={todo.completed ? "muted" : "main"}
        className={`flex-1 leading-snug transition-colors duration-150 ${
          todo.completed ? "line-through" : ""
        }`}
      >
        {todo.text}
      </Text>
      <button
        type="button"
        onClick={handleDeleteClick}
        aria-label="할 일 삭제"
        className="shrink-0 flex items-center justify-center w-6 h-6 rounded-md text-muted hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <TrashIcon />
      </button>
    </li>
  );
}

function TodoAddInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  const handleSubmit = () => {
    const value = inputRef.current?.value.trim() ?? "";
    if (value) {
      onAdd(value);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isAdding) {
    return (
      <div className="flex items-start gap-2.5 py-1.5 -mx-1.5 px-1.5 mt-1">
        <span className="flex items-center justify-center w-[18px] h-[18px] shrink-0 mt-px text-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="할 일 입력"
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm text-sub leading-snug bg-transparent outline-none border-b border-outline-strong focus:border-action placeholder:text-muted"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsAdding(true)}
      className="flex items-center gap-1.5 mt-2 text-xs text-muted hover:text-sub transition-colors duration-150 cursor-pointer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
      <Text as="span" variant="caption">
        할 일 추가
      </Text>
    </button>
  );
}

export function TodoSection({
  todos,
  onToggle,
  onUpdate,
  onAdd,
  onDelete,
}: {
  todos: BlockTodo[];
  onToggle: (todoId: string) => void;
  onUpdate: (todoId: string, text: string) => void;
  onAdd: (text: string) => void;
  onDelete: (todoId: string) => void;
}) {
  return (
    <div>
      {todos.length > 0 && (
        <ul className="space-y-1">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => onToggle(todo.id)}
              onUpdate={(text) => onUpdate(todo.id, text)}
              onDelete={() => onDelete(todo.id)}
            />
          ))}
        </ul>
      )}
      <TodoAddInput onAdd={onAdd} />
    </div>
  );
}
