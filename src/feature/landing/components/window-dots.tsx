import { Text } from "@/src/components/ui";

export function WindowDots({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      <Text as="span" variant="caption" color="muted" weight="medium" className="ml-2">
        {title}
      </Text>
    </div>
  );
}
