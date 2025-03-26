import SidebarButton from "./SidebarButton"
import HomeIcon from "../assets/icons/home-icon.svg?react"
import TaskIcon from "../assets/icons/list-icon.svg?react"

const SideBar = () => {
  return (
    <div className="h-screen w-64 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-[#00ADB5]">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5]">organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unselected">
          <HomeIcon className="text-[#00ADB5]" />
          Início
        </SidebarButton>
        <SidebarButton variant="selected">
          <TaskIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default SideBar
