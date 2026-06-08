import PropTypes from "prop-types"
import { useState } from "react"

import { AddIcon, TrashIcon } from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"

function Header({ subtitle, title }) {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const handleDialogClose = async () => {
    setAddTaskDialogIsOpen(false)
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
        <Button color="ghost">
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
      </div>
    </div>
  )
}

Header.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
