import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  AddIcon,
  CloudIcon,
  LoadIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import { useGetTasks } from "../hooks/use-get-tasks"
import { useUpdateTask } from "../hooks/use-update-task"
import { taskQueryKeys } from "../keys/queries"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import Header from "./Header"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const queryClient = useQueryClient()
  const {  } = useUpdateTask()
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const nightTasks = tasks?.filter((task) => task.time === "night")

  const handleTaskCheckBoxClick = async (taskId) => {
    const newTasks = tasks?.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada!")
        return { ...task, status: "in_progress" }
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluída!")
        return { ...task, status: "done" }
      }

      if (task.status === "done") {
        toast.success("Tarefa reiniciada!")
        return { ...task, status: "not_started" }
      }

      return task
    })
    queryClient.setQueryData(taskQueryKeys.getAll(), newTasks)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="rounded-xl bg-white p-6">
        <Header subtitle="Bem-vindo de volta, Felipe!" title="Suas Tarefas" />
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para esse período do dia.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para esse período do dia.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {nightTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para esse período do dia.
            </p>
          )}
          {nightTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
