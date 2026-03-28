export const QUERY_KEYS = {
  rooms: ["rooms"] as const,
  room: (roomId: string) => ["room", roomId] as const,
  me: ["me"] as const,
} as const;
