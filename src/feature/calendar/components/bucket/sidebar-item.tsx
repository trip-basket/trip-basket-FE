const ITEM_HEIGHT = 32;
const EXPAND_EASING = "cubic-bezier(0.165, 0.84, 0.44, 1)";

export function SidebarItem({
  label,
  icon,
  isSelected,
  onClick,
  count,
  indent,
  hasChevron,
  isExpanded,
}: {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  count?: number;
  indent?: boolean;
  hasChevron?: boolean;
  isExpanded?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex w-full cursor-pointer items-center gap-2 rounded-md text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
        isSelected ? "hover:brightness-95" : "hover:bg-black/[0.04]"
      }`}
      style={{
        height: ITEM_HEIGHT,
        paddingLeft: indent ? 24 : 8,
        paddingRight: 8,
        backgroundColor: isSelected ? "var(--bg-accent-subtle)" : undefined,
        color: isSelected ? "var(--text-accent)" : "var(--text-secondary)",
        // @ts-expect-error -- CSS variable for focus ring
        "--tw-ring-color": "var(--border-accent)",
      }}
      onClick={onClick}
    >
      <span className="flex shrink-0 items-center justify-center" style={{ width: 16, height: 16 }}>
        {icon}
      </span>
      <span className="flex-1 truncate text-xs font-medium">{label}</span>
      {count !== undefined && (
        <span
          className="text-[10px] tabular-nums"
          style={{ color: isSelected ? "var(--text-accent)" : "var(--text-tertiary)" }}
        >
          {count}
        </span>
      )}
      {hasChevron && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="shrink-0"
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
        >
          <path
            d="M2.5 3.75L5 6.25L7.5 3.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export function ExpandableSection({
  isExpanded,
  itemCount,
  children,
}: {
  isExpanded: boolean;
  itemCount: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        maxHeight: isExpanded ? itemCount * ITEM_HEIGHT : 0,
        transition: `max-height 200ms ${EXPAND_EASING}`,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
