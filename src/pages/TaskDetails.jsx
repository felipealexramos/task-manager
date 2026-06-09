import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoadIcon,
  TrashIcon,
} from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Select from "../components/Select"
import SideBar from "../components/Sidebar"
import { useDeleteTask } from "../hooks/use-delete-task"
import { useGetTask } from "../hooks/use-get-task"
import { useUpdateTask } from "../hooks/use-update-task"

const TaskDetailsPage = () => {
  const { id: taskId } = useParams()
  const navigate = useNavigate()

  const { data: task } = useGetTask(taskId)

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(taskId)

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(taskId)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    // Valida ao sair do campo (onBlur) e revalida dinamicamente após o 1º envio.
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })

  useEffect(() => {
    if (task) {
      reset(task)
    }
  }, [task, reset])

  const handleFormSubmit = (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!")
        navigate("/tasks")
      },
      onError: () => {
        toast.error("Erro ao atualizar tarefa. Tente novamente.")
      },
    })
  }

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar essa tarefa?"
    )
    if (confirmDelete) {
      deleteTask(undefined, {
        onSuccess: () => {
          toast.success("Tarefa deletada com sucesso!")
          navigate("/tasks")
        },
        onError: () => {
          toast.error("Erro ao deletar tarefa. Tente novamente.")
        },
      })
    }
  }

  const isPending = isUpdating || isDeleting

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
              onClick={() => navigate("/")}
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
            disabled={isPending}
          >
            {isDeleting && <LoadIcon className="animate-spin" />}
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                disabled={isPending}
                errorMessage={errors.title?.message}
                {...register("title", {
                  required: "O título é obrigatório",
                  validate: (value) =>
                    value.trim() !== "" || "O título não pode ser vazio",
                })}
              />
            </div>
            <div>
              <Select
                disabled={isPending}
                errorMessage={errors.time?.message}
                {...register("time", { required: "O período é obrigatório" })}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                disabled={isPending}
                errorMessage={errors.description?.message}
                {...register("description", {
                  required: "A descrição é obrigatória",
                  validate: (value) =>
                    value.trim() !== "" || "A descrição não pode ser vazia",
                })}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={isPending}
            >
              {isUpdating && <LoadIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
