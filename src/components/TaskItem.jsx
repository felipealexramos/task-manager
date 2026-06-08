import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { CheckIcon, DetailsIcon, LoadIcon, TrashIcon } from "../assets/icons"
import { useDeleteTask } from "../hooks/use-delete-task"
import { useUpdateTask } from "../hooks/use-update-task"
import Button from "./Button"

const TaskItem = ({ task }) => {
  const { mutate, isPending } = useDeleteTask(task.id)
  const { mutate: updateTask } = useUpdateTask(task.id)

  const getStatusClasses = () => {
    return {
      done: "bg-brand-primary text-brand-primary",
      in_progress: "bg-brand-process text-brand-process",
      not_started: "bg-brand-dark-blue bg-opacity-5 text-brand-dark-blue",
    }[task.status]
  }

  const handleDeleteClick = () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success("Tarefa removida com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao remover tarefa. Tente novamente.")
      },
    })
  }

  const getNewStatus = () => {
    if (task.status === "not_started") {
      return "in_progress"
    }
    if (task.status === "in_progress") {
      return "done"
    }
    return "not_started"
  }

  const handleCheckBoxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada com sucesso!")
        },
        onError: () => {
          toast.error("Erro ao atualizar tarefa. Tente novamente.")
        },
      }
    )
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            className="absolute h-7 w-7 cursor-pointer disabled:cursor-not-allowed"
            checked={task.status === "done"}
            disabled={isPending}
            onChange={handleCheckBoxClick}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoadIcon className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            handleDeleteClick()
          }}
          disabled={isPending}
        >
          {isPending ? <LoadIcon className="animate-spin" /> : <TrashIcon />}
        </Button>
        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["not_started", "in_progress", "done"]).isRequired,
  }).isRequired,
  handleCheckBoxClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

export default TaskItem
