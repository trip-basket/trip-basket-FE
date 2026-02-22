import { Text } from "@/src/components/ui";

export function PropertyRow({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center min-h-[34px] group hover:bg-gray-50 rounded-sm -mx-1 px-1 transition-colors duration-100">
      <div className="flex items-center gap-1.5 w-28 shrink-0">
        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: "16px" }}>
          {icon}
        </span>
        <Text variant="small" color="muted">
          {label}
        </Text>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
