import type { BlockTodo } from "../../types";
import { SectionHeader } from "./section-header";

export function TodoSection({ todos }: { todos: BlockTodo[] }) {
  return (
    <div className="mb-6">
      <SectionHeader icon="checklist" label="TODO" />
      <ul className="space-y-1">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-start gap-2 py-1 group hover:bg-gray-50 rounded -mx-1 px-1 transition-colors duration-100"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span
              className={`text-sm leading-snug ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
