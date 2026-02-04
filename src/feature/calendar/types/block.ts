export type Block = {
  id: string;
  title: string;

  dayIndex: number;

  /** 시작 시각 (7 = 07:00, 9.5 = 09:30) */
  startHour: number;

  /** 종료 시각 (10 = 10:00, 11.5 = 11:30) */
  endHour: number;
};

export function getBlockDuration(block: Block): number {
  return block.endHour - block.startHour;
}

export function formatBlockTime(block: Block): string {
  return `${formatTime(block.startHour)} – ${formatTime(block.endHour)}`;
}

function formatTime(hour: number): string {
  const h = Math.floor(hour);
  const m = (hour - h) * 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
