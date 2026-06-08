import React from "react"

import DashboardCards from "../components/DashboardCards"
import Header from "../components/Header"
import SideBar from "../components/Sidebar"
import TaskItem from "../components/TaskItem"
import TasksChart from "../components/TasksChart"
import { useGetTasks } from "../hooks/use-get-tasks"

const HomePage = () => {
  const { data: tasks } = useGetTasks()
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Bem-vindo de volta, Felipe!" title="Suas Tarefas" />
        <DashboardCards />
        <div className="grid-cols-[1.5fr, 1fr] grid gap-9">
          <div className="space-y-6 rounded-[10px] bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold">Tarefas</h3>
            <span className="text-sm text-brand-text-gray">
              Resumo das tarefas disponíveis
            </span>
            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-[10px] bg-white p-6 shadow-md">
            <div>
              <h3 className="text-xl font-semibold">Gráficos</h3>
              <span className="text-sm text-brand-text-gray">
                Distribuição por status
              </span>
            </div>
            <TasksChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
