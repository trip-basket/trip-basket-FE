import type {
  BlockListItemApi,
  BlockResponseApi,
  CreateBlockRequestApi,
  UpdateBlockRequestApi,
} from "@/src/lib/api/block";
import type { Place } from "@/src/types";
import { toPlaceCategory } from "@/src/types";
import type { BucketBlock, ScheduledBlock } from "../types";
import { DEFAULT_BLOCK_DURATION } from "../types";

export function toBucketBlock(api: BlockResponseApi): BucketBlock {
  return {
    id: api.id,
    place: toPlace(api.place),
    name: api.name,
    status: "bucket",
    cost: api.cost ?? undefined,
    memo: api.memo ?? undefined,
    addedBy: api.addedBy,
    addedAt: api.addedAt,
    reactions: api.reactions.map((r) => ({ memberId: r.memberId })),
    todos: api.todos.map((t) => ({ ...t, blockId: api.id })),
  };
}

export function toScheduledBlock(api: BlockResponseApi): ScheduledBlock {
  return {
    id: api.id,
    place: toPlace(api.place),
    name: api.name,
    status: "scheduled",
    cost: api.cost ?? undefined,
    memo: api.memo ?? undefined,
    addedBy: api.addedBy,
    addedAt: api.addedAt,
    reactions: api.reactions.map((r) => ({ memberId: r.memberId })),
    todos: api.todos.map((t) => ({ ...t, blockId: api.id })),
    startHour: api.startTime ? parseHour(api.startTime) : 9,
    endHour: api.endTime ? parseHour(api.endTime) : 10,
  };
}

export function toBucketBlockFromList(api: BlockListItemApi): BucketBlock {
  return {
    id: api.id,
    place: toListPlace(api.place),
    name: api.name,
    status: "bucket",
    addedBy: api.addedBy,
    addedAt: api.addedAt,
    reactions: api.reactions.map((r) => ({ memberId: r.memberId })),
  };
}

export function toScheduledBlockFromList(api: BlockListItemApi): ScheduledBlock {
  return {
    id: api.id,
    place: toListPlace(api.place),
    name: api.name,
    status: "scheduled",
    addedBy: api.addedBy,
    addedAt: api.addedAt,
    reactions: api.reactions.map((r) => ({ memberId: r.memberId })),
    startHour: api.startTime ? parseHour(api.startTime) : 9,
    endHour: api.endTime ? parseHour(api.endTime) : 10,
  };
}

function toListPlace(api: BlockListItemApi["place"]): Place {
  return {
    googlePlaceId: api.placeId,
    placeName: api.placeName,
    category: toPlaceCategory(api.category),
  };
}

export function toCreateBucketRequest(place: Place, name: string): CreateBlockRequestApi {
  return {
    status: "bucket",
    googlePlaceId: place.googlePlaceId,
    name,
  };
}

export function toCreateScheduledRequest(
  place: Place,
  name: string,
  date: string,
  startHour: number,
): CreateBlockRequestApi {
  const endHour = startHour + DEFAULT_BLOCK_DURATION;
  return {
    status: "scheduled",
    googlePlaceId: place.googlePlaceId,
    name,
    startTime: `${date}T${hourToTimeString(startHour)}`,
    endTime: `${date}T${hourToTimeString(endHour)}`,
  };
}

export function toScheduleUpdateRequest(
  date: string,
  startHour: number,
  endHour: number,
): UpdateBlockRequestApi {
  return {
    status: "scheduled",
    startTime: `${date}T${hourToTimeString(startHour)}`,
    endTime: `${date}T${hourToTimeString(endHour)}`,
  };
}

export function toBucketUpdateRequest(): UpdateBlockRequestApi {
  return {
    status: "bucket",
    startTime: null,
    endTime: null,
  };
}

function toPlace(api: BlockResponseApi["place"]): Place {
  return {
    googlePlaceId: api.googlePlaceId,
    placeName: api.placeName,
    formattedAddress: api.formattedAddress,
    position: api.position,
    category: toPlaceCategory(api.category),
    rating: api.rating,
    reviewCount: api.reviewCount,
    openingHours: api.openingHours,
    priceLevel: api.priceLevel,
    photoUrl: api.photoUrl ?? "",
  };
}

function parseHour(isoDatetime: string): number {
  const timePart = isoDatetime.split("T")[1];
  const [hours, minutes] = timePart.split(":").map(Number);
  return hours + minutes / 60;
}

function hourToTimeString(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}
