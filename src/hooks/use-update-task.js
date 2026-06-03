import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title.trim(),
          description: data.description.trim(),
          time: data.time,
        }),
      })
      if (!response.ok) {
        throw new Error("Falha ao atualizar tarefa")
      }
      return response.json()
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["task", taskId], updatedTask)
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks?.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      )
    },
  })
}
