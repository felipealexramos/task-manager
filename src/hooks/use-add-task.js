import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
          status: "not_started",
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao adicionar tarefa")
      }
      const createdTask = await response.json()
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => [
        ...(oldTasks ?? []),
        createdTask,
      ])
    },
  })
}
