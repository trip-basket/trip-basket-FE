"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";

const INITIAL_BACKOFF_MS = 1000;
const MAX_RETRY_DELAY_MS = 30000;
const MIN_WAIT_FLOOR_MS = 1000;

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              if (failureCount >= 3) {
                return false;
              }

              if (isAxiosError(error)) {
                const status = error?.response?.status;
                if (status && [401, 403, 404].includes(status)) {
                  return false;
                }
              }

              return true;
            },
            retryDelay: (attemptIndex) =>
              Math.random() * Math.min(INITIAL_BACKOFF_MS * 2 ** attemptIndex, MAX_RETRY_DELAY_MS) +
              MIN_WAIT_FLOOR_MS,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
