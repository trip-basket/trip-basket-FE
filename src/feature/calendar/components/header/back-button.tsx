"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="icon"
      color="neutral"
      size="sm"
      className="hover-item cursor-pointer"
      aria-label="대시보드로 이동"
      onClick={() => router.push("/dashboard")}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M10 13L5 8L10 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}
