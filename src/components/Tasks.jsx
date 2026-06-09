import { CloudIcon, MoonIcon, SunIcon } from "../assets/icons"
import { useGetTasks } from "../hooks/use-get-tasks"
import AddTaskButton from "./AddTaskButton"
import EmptyState from "./EmptyState"
import Header from "./Header"
import QueryError from "./QueryError"
import Skeleton from "./Skeleton"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const { data: tasks, isLoading, isError, refetch } = useGetTasks()

  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const nightTasks = tasks?.filter((task) => task.time === "night")

  const renderTasks = (groupTasks) => {
    if (isLoading) {
      return Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} className="h-[50px] w-full" />
      ))
    }
    if (groupTasks?.length === 0) {
      return (
        <p className="text-center text-sm text-brand-text-gray">
          Nenhuma tarefa para esse período do dia.
        </p>
      )
    }
    return groupTasks?.map((task) => <TaskItem key={task.id} task={task} />)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="rounded-xl bg-white p-6">
        <Header subtitle="Bem-vindo de volta!" title="Suas Tarefas" />
        {isError ? (
          <QueryError
            message="Não foi possível carregar as tarefas."
            onRetry={() => refetch()}
          />
        ) : !isLoading && tasks?.length === 0 ? (
          <EmptyState
            title="Nenhuma tarefa por aqui"
            description="Crie sua primeira tarefa para começar a organizar a sua rotina."
            action={<AddTaskButton label="Criar primeira tarefa" />}
          />
        ) : (
          <>
            <div className="space-y-3">
              <TaskSeparator title="Manhã" icon={<SunIcon />} />
              {renderTasks(morningTasks)}
            </div>

            <div className="my-6 space-y-3">
              <TaskSeparator title="Tarde" icon={<CloudIcon />} />
              {renderTasks(afternoonTasks)}
            </div>

            <div className="space-y-3">
              <TaskSeparator title="Noite" icon={<MoonIcon />} />
              {renderTasks(nightTasks)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Tasks
