import { useRef } from "react";
import { createModalStore, type ModalStore } from "./modal-store";

export function useModal() {
  const storeRef = useRef<ModalStore>(null);

  if (storeRef.current === null) {
    storeRef.current = createModalStore();
  }

  const store = storeRef.current;

  return {
    open: () => store.getState().open(),
    close: () => store.getState().close(),
    ref: store,
  };
}
