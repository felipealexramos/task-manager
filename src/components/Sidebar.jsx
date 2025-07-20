import { HomeIcon, TaskIcon } from "../assets/icons"
import SidebarButton from "./SidebarButton"

const SideBar = () => {
  return (
    <div className="h-screen w-64 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-brand-primary">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-brand-primary">organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton color="unselected">
          <HomeIcon className="text-brand-primary" />
          Início
        </SidebarButton>
        <SidebarButton color="selected">
          <TaskIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default SideBar
