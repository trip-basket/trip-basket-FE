import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, ROOM_TOAST_MESSAGES, roomApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/api/query-keys";
import { toast } from "@/src/lib/toast";

export function useDeleteRoom(roomId: string, roomName: string) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => roomApi.delete(roomId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms }),
    onError: (error) => toast.error(getErrorMessage(error, ROOM_TOAST_MESSAGES.delete)),
  });

  const handleDelete = () => {
    if (window.confirm(`"${roomName}" 방을 삭제하시겠습니까?`)) {
      deleteMutation.mutate();
    }
  };

  return { handleDelete, isPending: deleteMutation.isPending };
}
