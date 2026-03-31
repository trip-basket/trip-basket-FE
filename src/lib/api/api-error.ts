export class ApiError extends Error {
  readonly status: number | undefined;

  constructor(status?: number) {
    super(String(status ?? "NETWORK_ERROR"));
    this.name = "ApiError";
    this.status = status;
  }
}

export interface ErrorMessages {
  [status: number]: string;
  default: string;
}

export function getErrorMessage(error: unknown, messages: ErrorMessages): string {
  if (error instanceof ApiError && error.status != null) {
    return messages[error.status] ?? messages.default;
  }
  return messages.default;
}

export interface FallbackContent {
  title: string;
  description: string;
}

export interface FallbackMessages {
  [status: number]: FallbackContent;
  default: FallbackContent;
}
