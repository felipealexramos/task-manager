import { useQuery } from "@tanstack/react-query"

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
      if (!response.ok) {
        throw new Error("Tarefa não encontrada")
      }
      return response.json()
    },
  })
}
