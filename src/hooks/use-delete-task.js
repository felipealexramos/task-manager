import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../keys/mutations"
import { taskQueryKeys } from "../keys/queries"
import { api } from "../lib/axios"

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
      return deletedTask
    },
    // UI otimista: remove da lista antes da API responder
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.getAll() })

      const previousTasks = queryClient.getQueryData(taskQueryKeys.getAll())

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) =>
        oldTasks?.filter((t) => t.id !== taskId)
      )

      return { previousTasks }
    },
    // Rollback se a remoção falhar
    onError: (_err, _vars, context) => {
      if (context?.previousTasks !== undefined) {
        queryClient.setQueryData(taskQueryKeys.getAll(), context.previousTasks)
      }
    },
  })
}
