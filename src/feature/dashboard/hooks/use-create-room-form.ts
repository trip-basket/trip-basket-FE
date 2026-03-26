import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { formatLocalDate } from "@/src/feature/calendar/utils";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { toast } from "@/src/lib/toast";
import { type CreateRoomInput, createRoomSchema } from "../utils/validate-create-room";

export function useCreateRoomForm(onClose: () => void) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<CreateRoomInput>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: { name: "", tripStartDate: "", tripEndDate: "" },
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateRoomInput) => roomApi.create(data),
    onSuccess: (room) => {
      resetForm();
      onClose();
      window.location.href = `/plan/${room.id}`;
    },
    onError: () => toast.error(ROOM_ERROR_MESSAGES.create),
  });

  const resetForm = () => {
    reset();
    setRange(undefined);
  };

  const handleRangeSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    setValue("tripStartDate", newRange?.from ? formatLocalDate(newRange.from) : "");
    setValue("tripEndDate", newRange?.to ? formatLocalDate(newRange.to) : "");
    clearErrors(["tripStartDate", "tripEndDate"]);
  };

  const onSubmit = handleSubmit((data) => createMutation.mutate(data));

  return {
    range,
    errors,
    isPending: createMutation.isPending,
    register,
    resetForm,
    handleRangeSelect,
    onSubmit,
  };
}
