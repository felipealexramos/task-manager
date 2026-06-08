import PropTypes from "prop-types"
import { useState } from "react"
import { toast } from "sonner"

import { AddIcon, TrashIcon } from "../assets/icons"
import { useClearTasks } from "../hooks/use-clear-tasks"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import ConfirmDialog from "./ConfirmDialog"

function Header({ subtitle, title }) {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  const [clearDialogIsOpen, setClearDialogIsOpen] = useState(false)
  const { mutate: clearTasks, isPending } = useClearTasks()

  const handleDialogClose = async () => {
    setAddTaskDialogIsOpen(false)
  }

  const handleClearTasksConfirm = () => {
    clearTasks(undefined, {
      onSuccess: () => {
        setClearDialogIsOpen(false)
        toast.success("Tarefas removidas com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao remover tarefas. Tente novamente.")
      },
    })
  }

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button
          color="ghost"
          onClick={() => setClearDialogIsOpen(true)}
          disabled={isPending}
        >
          <TrashIcon />
          Limpar Tarefas
        </Button>
        <Button onClick={() => setAddTaskDialogIsOpen(true)}>
          <AddIcon />
          Nova Tarefa
        </Button>

        <AddTaskDialog
          isOpen={addTaskDialogIsOpen}
          handleClose={handleDialogClose}
        />

        <ConfirmDialog
          isOpen={clearDialogIsOpen}
          title="Limpar Tarefas"
          description="Tem certeza que deseja excluir todas as tarefas? Esta ação não pode ser desfeita."
          confirmLabel="Excluir"
          isLoading={isPending}
          onConfirm={handleClearTasksConfirm}
          onCancel={() => setClearDialogIsOpen(false)}
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
