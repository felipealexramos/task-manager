import Button from "./Button"
import TrashIcon from "../assets/icons/trash-icon.svg?react"
import AddIcon from "../assets/icons/add-icon.svg?react"

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
    </div>
  )
}

export default Tasks
