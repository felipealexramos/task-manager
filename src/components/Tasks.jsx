import Button from "./Button"
import TrashIcon from "../assets/icons/trash.svg?react"
import AddIcon from "../assets/icons/add.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudIcon from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"
import TASKS from "../data/tasks"

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <TrashIcon />
            Limpar Tarefas
          </Button>
          <Button>
            <AddIcon />
            Adicionar Tarefa
          </Button>
        </div>
      </div>

      {/* LISTA DE TAREFAS */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-[#E5E5E5] pb-1 text-sm">
            <SunIcon />
            <p className="text-[#9A9C9F]">Manhã</p>
          </div>
        </div>

        <div className="my-6 space-y-3">
          <div className="flex gap-2 border-b border-[#E5E5E5] pb-1 text-sm">
            <CloudIcon />
            <p className="text-[#9A9C9F]">Tarde</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2 border-b border-[#E5E5E5] pb-1 text-sm">
            <MoonIcon />
            <p className="text-[#9A9C9F]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
