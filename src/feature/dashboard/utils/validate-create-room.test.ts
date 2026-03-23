import { describe, expect, it } from "vitest";
import { validateCreateRoom } from "./validate-create-room";

describe("validateCreateRoom", () => {
  it("모든 필드가 유효하면 에러 없이 통과한다", () => {
    const result = validateCreateRoom({
      name: "런던 여행",
      tripStartDate: "2026-03-16",
      tripEndDate: "2026-03-29",
    });
    expect(result).toEqual({ valid: true, errors: {} });
  });

  it("name이 비어있으면 에러를 반환한다", () => {
    const result = validateCreateRoom({
      name: "",
      tripStartDate: "2026-03-16",
      tripEndDate: "2026-03-29",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("name이 공백만 있으면 에러를 반환한다", () => {
    const result = validateCreateRoom({
      name: "   ",
      tripStartDate: "2026-03-16",
      tripEndDate: "2026-03-29",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("tripStartDate가 비어있으면 에러를 반환한다", () => {
    const result = validateCreateRoom({
      name: "런던 여행",
      tripStartDate: "",
      tripEndDate: "2026-03-29",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.tripStartDate).toBeDefined();
  });

  it("tripEndDate가 비어있으면 에러를 반환한다", () => {
    const result = validateCreateRoom({
      name: "런던 여행",
      tripStartDate: "2026-03-16",
      tripEndDate: "",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.tripEndDate).toBeDefined();
  });

  it("종료일이 시작일보다 이전이면 에러를 반환한다", () => {
    const result = validateCreateRoom({
      name: "런던 여행",
      tripStartDate: "2026-03-29",
      tripEndDate: "2026-03-16",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.tripEndDate).toBeDefined();
  });

  it("시작일과 종료일이 같으면 유효하다", () => {
    const result = validateCreateRoom({
      name: "당일치기",
      tripStartDate: "2026-03-16",
      tripEndDate: "2026-03-16",
    });
    expect(result).toEqual({ valid: true, errors: {} });
  });

  it("모든 필드가 비어있으면 모든 에러를 반환한다", () => {
    const result = validateCreateRoom({
      name: "",
      tripStartDate: "",
      tripEndDate: "",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.tripStartDate).toBeDefined();
    expect(result.errors.tripEndDate).toBeDefined();
  });
});
