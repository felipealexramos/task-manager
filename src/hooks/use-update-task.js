import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../keys/mutations"
import { taskQueryKeys } from "../keys/queries"
import { api } from "../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.put(`/tasks/${taskId}`, {
        title: data?.title.trim(),
        description: data?.description.trim(),
        time: data?.time,
        status: data?.status,
      })
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) =>
        oldTasks?.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      )
      queryClient.setQueryData(taskQueryKeys.getOneById(taskId), updatedTask)
    },
  })
}
