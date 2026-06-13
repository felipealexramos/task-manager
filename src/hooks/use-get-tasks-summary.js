import { useGetTasks } from "./use-get-tasks"

const INITIAL_COUNTS = { not_started: 0, in_progress: 0, done: 0 }

export const useGetTasksSummary = () => {
  const { data: tasks, isLoading, isError, refetch } = useGetTasks()

  const counts = (tasks ?? []).reduce(
    (acc, task) => ({ ...acc, [task.status]: acc[task.status] + 1 }),
    INITIAL_COUNTS
  )

  return {
    notStarted: counts.not_started,
    inProgress: counts.in_progress,
    done: counts.done,
    isLoading,
    isError,
    refetch,
  }
}
