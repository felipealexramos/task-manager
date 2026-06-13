import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../keys/mutations"
import { taskQueryKeys } from "../keys/queries"
import { api } from "../lib/axios"

export const useClearTasks = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.clearAll(),
    mutationFn: async () => {
      const tasks = queryClient.getQueryData(taskQueryKeys.getAll()) ?? []
      await Promise.all(tasks.map((task) => api.delete(`/tasks/${task.id}`)))
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), [])
    },
  })
}
