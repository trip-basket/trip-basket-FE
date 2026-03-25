import { z } from "zod";

export const createRoomSchema = z
  .object({
    name: z.string().trim().min(1, "여행 이름을 입력해주세요"),
    tripStartDate: z.string().min(1, "시작일을 선택해주세요"),
    tripEndDate: z.string().min(1, "종료일을 선택해주세요"),
  })
  .refine(
    (data) => !data.tripStartDate || !data.tripEndDate || data.tripEndDate >= data.tripStartDate,
    {
      message: "종료일은 시작일 이후여야 합니다",
      path: ["tripEndDate"],
    },
  );

export type CreateRoomInput = z.infer<typeof createRoomSchema>;

export interface ValidationErrors {
  name?: string;
  tripStartDate?: string;
  tripEndDate?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

export function validateCreateRoom(input: CreateRoomInput): ValidationResult {
  const result = createRoomSchema.safeParse(input);

  if (result.success) {
    return { valid: true, errors: {} };
  }

  const errors: ValidationErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ValidationErrors;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { valid: false, errors };
}
