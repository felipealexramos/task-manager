import React from "react"

import DashboardCards from "../components/DashboardCards"
import Header from "../components/Header"
import QueryError from "../components/QueryError"
import SideBar from "../components/Sidebar"
import Skeleton from "../components/Skeleton"
import TaskItem from "../components/TaskItem"
import TasksChart from "../components/TasksChart"
import { useGetTasks } from "../hooks/use-get-tasks"

const HomePage = () => {
  const { data: tasks, isLoading, isError, refetch } = useGetTasks()
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Bem-vindo de volta!" title="Suas Tarefas" />
        <DashboardCards />
        <div className="grid grid-cols-[1.5fr_1fr] gap-9">
          <div className="space-y-6 rounded-[10px] bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold">Tarefas</h3>
            <span className="text-sm text-brand-text-gray">
              Resumo das tarefas disponíveis
            </span>
            <div className="space-y-3">
              {isLoading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-[50px] w-full" />
                ))}
              {isError && (
                <QueryError
                  message="Não foi possível carregar as tarefas."
                  onRetry={() => refetch()}
                />
              )}
              {!isLoading && !isError && tasks?.length === 0 && (
                <p className="text-center text-sm text-brand-text-gray">
                  Nenhuma tarefa criada ainda.
                </p>
              )}
              {!isLoading &&
                !isError &&
                tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
            </div>
          </div>
          <div className="space-y-4 rounded-[10px] bg-white p-6 shadow-md">
            <div>
              <h3 className="text-xl font-semibold">Gráfico</h3>
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
