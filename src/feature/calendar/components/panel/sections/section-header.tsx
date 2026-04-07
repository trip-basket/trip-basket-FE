import { Text } from "@/src/components/ui";

const ICON_PATHS: Record<string, string> = {
  checklist:
    "M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z",
  schedule:
    "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
  map: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z",
  editNote:
    "M3 10h11v2H3v-2zm0-2h11V6H3v2zm0 8h7v-2H3v2zm15.01-3.13l.71-.71c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71-2.12-2.12zm-.71.71l-5.3 5.3V21h2.12l5.3-5.3-2.12-2.12z",
  place:
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
};

export function SectionHeader({ icon, label }: { icon: string; label: string }) {
  const path = ICON_PATHS[icon];

  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center gap-1.5 shrink-0">
        {path && (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-muted shrink-0"
            aria-hidden="true"
          >
            <path d={path} />
          </svg>
        )}
        <Text
          as="span"
          variant="caption"
          color="muted"
          weight="semibold"
          className="uppercase tracking-wider"
        >
          {label}
        </Text>
      </div>
      <div className="flex-1 h-px bg-outline" />
    </div>
  );
}
