import { toast } from "./toast";

type ErrorHandler = string | ((error: unknown) => void);

export async function request<T>(fn: () => Promise<T>, onError: ErrorHandler): Promise<T | null> {
  try {
    return await fn();
  } catch (e) {
    if (typeof onError === "string") {
      toast.error(onError);
    } else {
      onError(e);
    }
    return null;
  }
}
