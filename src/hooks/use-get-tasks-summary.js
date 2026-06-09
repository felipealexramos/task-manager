import { useQueries } from "@tanstack/react-query"

import { taskQueryKeys } from "../keys/queries"
import { api } from "../lib/axios"

const STATUSES = ["not_started", "in_progress", "done"]

export const useGetTasksSummary = () => {
  const results = useQueries({
    queries: STATUSES.map((status) => ({
      queryKey: taskQueryKeys.getByStatus(status),
      queryFn: async () => {
        const { data } = await api.get("/tasks", { params: { status } })
        return data
      },
    })),
  })

  return {
    notStarted: results[0].data?.length ?? 0,
    inProgress: results[1].data?.length ?? 0,
    done: results[2].data?.length ?? 0,
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
    refetch: () => results.forEach((r) => r.refetch()),
  }
}
