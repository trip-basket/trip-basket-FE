interface ResizerProps {
  onPointerDown: (e: React.PointerEvent) => void;
}

export function Resizer({ onPointerDown }: ResizerProps) {
  return (
    <div
      onPointerDown={onPointerDown}
      className="shrink-0 w-3 cursor-col-resize flex items-center justify-center group"
    >
      <div className="w-1 h-12 rounded-full bg-gray-300 group-hover:bg-gray-400 group-active:bg-gray-500 transition-colors" />
    </div>
  );
}
