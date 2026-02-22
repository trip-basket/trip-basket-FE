import { Text } from "@/src/components/ui";

export function SectionHeader({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <span className="material-symbols-outlined text-gray-400" style={{ fontSize: "16px" }}>
        {icon}
      </span>
      <Text variant="small" color="muted" weight="medium">
        {label}
      </Text>
    </div>
  );
}
