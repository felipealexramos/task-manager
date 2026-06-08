import { GlassWaterIcon, LoadIcon, TaskIcon, Tasks2Icon } from "../assets/icons"
import { useGetTasks } from "../hooks/use-get-tasks"
import { useGetTasksSummary } from "../hooks/use-get-tasks-summary"
import DashboardCard from "./../components/DashboardCard"

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()
  const { notStarted, inProgress, done } = useGetTasksSummary()

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<GlassWaterIcon />}
        mainText={tasks?.length.toString() ?? "0"}
        secondaryText="Tarefas Totais"
      />
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={notStarted.toString()}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoadIcon />}
        mainText={inProgress.toString()}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<TaskIcon />}
        mainText={done.toString()}
        secondaryText="Tarefas concluídas"
      />
    </div>
  )
}

export default DashboardCards
