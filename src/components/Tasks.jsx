import {
  AddIcon,
  CloudIcon,
  LoadIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import { useGetTasks } from "../hooks/use-get-tasks"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import Header from "./Header"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const nightTasks = tasks?.filter((task) => task.time === "night")

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="rounded-xl bg-white p-6">
        <Header subtitle="Bem-vindo de volta!" title="Suas Tarefas" />
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para esse período do dia.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
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
            <TaskItem key={task.id} task={task} />
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
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
