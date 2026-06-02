import { useMutation, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { CheckIcon, DetailsIcon, LoadIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

const TaskItem = ({ task, handleCheckBoxClick }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteTask", task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Falha ao remover tarefa")
      }
    },
  })
  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-brand-primary text-brand-primary"
      case "in_progress":
        return "bg-brand-process text-brand-process"
      case "not_started":
        return "bg-brand-dark-blue text-brand-dark-blue"
      default:
        return ""
    }
  }

  const handleDeleteClick = async (taskId) => {
    mutate(taskId, {
      onSuccess: () => {
        queryClient.setQueryData(["tasks"], (oldTasks) =>
          (oldTasks ?? []).filter((task) => task.id !== taskId)
        )
        toast.success("Tarefa removida com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao remover tarefa. Tente novamente.")
      },
    })
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses}`}
        >
          <input
            type="checkbox"
            className="absolute h-7 w-7 cursor-pointer disabled:cursor-not-allowed"
            checked={task.status === "done"}
            disabled={isPending}
            onChange={() => handleCheckBoxClick(task.id)}
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
            handleDeleteClick(task.id)
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
