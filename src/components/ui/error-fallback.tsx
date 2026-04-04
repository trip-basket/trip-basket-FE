"use client";

import { useRouter } from "next/navigation";
import type { FallbackProps } from "react-error-boundary";
import { ApiError } from "@/src/lib/api";
import type { FallbackMessages } from "@/src/lib/api/api-error";
import { Button } from "./button";
import { Text } from "./text";

const DEFAULT_CONTENT = {
  title: "문제가 발생했습니다",
  description: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
};

function getContent(error: unknown, messages?: FallbackMessages) {
  if (error instanceof ApiError && error.status != null && messages?.[error.status]) {
    return messages[error.status];
  }
  if (messages?.default) {
    return messages.default;
  }
  return DEFAULT_CONTENT;
}

interface ErrorFallbackProps extends FallbackProps {
  errorContents?: FallbackMessages;
}

export function ErrorFallback({ error, resetErrorBoundary, errorContents }: ErrorFallbackProps) {
  const router = useRouter();
  const { title, description } = getContent(error, errorContents);

  return (
    <div className="relative flex w-full min-h-dvh items-center justify-center bg-gray-50/30">
      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-500"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <Text variant="h3" weight="bold" className="mb-2">
          {title}
        </Text>
        <Text variant="body" color="soft" className="mb-10 max-w-sm leading-relaxed">
          {description}
        </Text>

        <div className="flex gap-3">
          <Button
            variant="outline"
            color="neutral"
            size="md"
            className="cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            대시보드로 이동
          </Button>
          <Button
            variant="solid"
            color="primary"
            size="md"
            className="cursor-pointer"
            onClick={resetErrorBoundary}
          >
            다시 시도
          </Button>
        </div>
      </div>
    </div>
  );
}
