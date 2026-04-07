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

function TodoCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex items-center justify-center w-[18px] h-[18px] rounded-md shrink-0 mt-px transition-colors duration-150 ${
        checked
          ? "bg-[var(--bg-accent)] text-white"
          : "border border-outline-strong text-transparent hover:border-outline-strong"
      }`}
    >
      <CheckIcon />
    </span>
  );
}

export function TodoSection({ todos }: { todos: BlockTodo[] }) {
  return (
    <ul className="space-y-1">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-start gap-2.5 py-1.5 group hover:bg-hover rounded-lg -mx-1.5 px-1.5 transition-colors duration-100 cursor-pointer"
        >
          <TodoCheckbox checked={todo.completed} />
          <Text
            as="span"
            variant="small"
            color={todo.completed ? "muted" : "main"}
            className={`leading-snug transition-colors duration-150 ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.text}
          </Text>
        </li>
      ))}
    </ul>
  );
}
