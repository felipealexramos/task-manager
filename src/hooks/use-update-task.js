import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.put(`/tasks/${taskId}`, data)
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["task", taskId], updatedTask)
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks?.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      )
    },
  })
}
