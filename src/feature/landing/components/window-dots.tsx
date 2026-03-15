export function WindowDots({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      <span className="ml-2 text-xs text-gray-400 font-medium">{title}</span>
    </div>
  );
}
