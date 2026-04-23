export type { OpeningHour, Place, PlaceCategory } from "@/src/types";

import type { Place } from "@/src/types";

export type BlockStatus = "bucket" | "scheduled";

export type BlockColorName =
  | "sky"
  | "indigo"
  | "violet"
  | "rose"
  | "teal"
  | "amber"
  | "fuchsia"
  | "slate";

export interface BlockColorPalette {
  base: string;
  tint: string;
  accent: string;
}

export interface Reaction {
  memberId: string;
  type: string;
}

export interface BlockTodo {
  id: string;
  text: string;
  completed: boolean;
}

interface BlockBase {
  id: string;
  place: Place;
  name: string;
  cost?: number;
  memo?: string;
  addedBy?: string;
  addedAt?: string;
  lockedBy?: string;
  reactions?: Reaction[];
  todos?: BlockTodo[];
}

export interface BucketBlock extends BlockBase {
  status: "bucket";
}

export interface ScheduledBlock extends BlockBase {
  status: "scheduled";
  startHour: number;
  endHour: number;
}

export type Block = BucketBlock | ScheduledBlock;

export interface TripDay {
  date: string;
  dayOfWeek: string;
  dateNum: number;
  blocks: ScheduledBlock[];
}

export const DEFAULT_BLOCK_DURATION = 1;
