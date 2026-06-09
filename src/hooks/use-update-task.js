import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../keys/mutations"
import { taskQueryKeys } from "../keys/queries"
import { api } from "../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time,
        status: data?.status,
      })
      return updatedTask
    },
    // UI otimista: atualiza o cache antes da API responder
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.getAll() })
      await queryClient.cancelQueries({
        queryKey: taskQueryKeys.getOneById(taskId),
      })

      const previousTasks = queryClient.getQueryData(taskQueryKeys.getAll())
      const previousTask = queryClient.getQueryData(
        taskQueryKeys.getOneById(taskId)
      )

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) =>
        oldTasks?.map((t) => (t.id === taskId ? { ...t, ...newData } : t))
      )
      queryClient.setQueryData(taskQueryKeys.getOneById(taskId), (oldTask) =>
        oldTask ? { ...oldTask, ...newData } : oldTask
      )

      return { previousTasks, previousTask }
    },
    // Rollback se a requisição falhar
    onError: (_err, _newData, context) => {
      if (context?.previousTasks !== undefined) {
        queryClient.setQueryData(taskQueryKeys.getAll(), context.previousTasks)
      }
      if (context?.previousTask !== undefined) {
        queryClient.setQueryData(
          taskQueryKeys.getOneById(taskId),
          context.previousTask
        )
      }
    },
    // Reconcilia com a resposta real do servidor
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) =>
        oldTasks?.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      )
      queryClient.setQueryData(taskQueryKeys.getOneById(taskId), updatedTask)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "tasks" &&
          typeof query.queryKey[1] === "object",
      })
    },
  })
}
