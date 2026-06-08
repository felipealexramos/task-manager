import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskQueryKeys } from "../keys/queries"
import { api } from "../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.put(`/tasks/${taskId}`, data)
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(taskQueryKeys.getOneById(taskId), updatedTask)
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) =>
        oldTasks?.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      )
    },
  })
}
