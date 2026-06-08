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
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) =>
        oldTasks?.filter((t) => t.id !== deletedTask.id)
      )
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "tasks" &&
          typeof query.queryKey[1] === "object",
      })
    },
  })
}
