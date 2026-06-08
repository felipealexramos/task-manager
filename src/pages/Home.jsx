import React from "react"

import { GlassWaterIcon, LoadIcon, TaskIcon, Tasks2Icon } from "../assets/icons"
import DashboardCard from "../components/DashboardCard"
import Header from "../components/Header"
import SideBar from "../components/Sidebar"
import Tasks from "../components/Tasks"
import { useGetTasks } from "../hooks/use-get-tasks"

// I made this way because the API doesn't return the tasks ordered by status, so I need to filter them in the frontend.
// If the API returned the tasks ordered by status, I could just  or take the number of tasks for each status and display it in the dashboard card.

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks =
    tasks?.filter((task) => task.status === "not_started").length ?? 0
  const inProgressTasks =
    tasks?.filter((task) => task.status === "in_progress").length ?? 0
  const doneTasks = tasks?.filter((task) => task.status === "done").length ?? 0

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Bem-vindo de volta, Felipe!" title="Suas Tarefas" />
        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<Tasks2Icon />}
            mainText={notStartedTasks?.toString()}
            secondaryText="Tarefas não iniciadas"
          />
          <DashboardCard
            icon={<TaskIcon />}
            mainText={doneTasks?.toString()}
            secondaryText="Tarefas concluídas"
          />
          <DashboardCard
            icon={<LoadIcon />}
            mainText={inProgressTasks?.toString()}
            secondaryText="Tarefas em andamento"
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText="8"
            secondaryText="Água"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
