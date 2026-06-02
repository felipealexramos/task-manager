import { useMutation, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"
import React from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { LoadIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import Select from "./Select"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
          status: "not_started",
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao adicionar tarefa")
      }

      return await response.json()
    },
  })
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })

  const handleFormSubmit = async (data) => {
    mutate(data, {
      onSuccess: (newTask) => {
        queryClient.setQueryData(["tasks"], (oldTasks) => [
          ...(oldTasks ?? []),
          newTask,
        ])
        toast.success("Tarefa adicionada com sucesso!")
        handleClose()
        reset()
      },
      onError: () => {
        toast.error("Erro ao adicionar tarefa. Tente novamente.")
      },
    })
  }

  const handleCancel = () => {
    handleClose()
    reset()
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-brand-dark-blue">
          Nova Tarefa
        </h2>
        <p className="mb-4 mt-1 text-brand-text-gray">
          Insira as informações abaixo:
        </p>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Input
            id="task-title"
            label="Título"
            placeholder="Insira o título da tarefa"
            errorMessage={errors.title?.message}
            disabled={isPending}
            {...register("title", {
              required: "O título é obrigatório",
              validate: (value) => {
                if (value.trim() === "") {
                  return "O título não pode ser vazio"
                }
                return true
              },
            })}
          />
          <Select
            {...register("time", { required: "O período é obrigatório" })}
            errorMessage={errors.time?.message}
            disabled={isPending}
          />

          <Input
            id="task-description"
            label="Descrição"
            placeholder="Descrição da tarefa"
            errorMessage={errors.description?.message}
            disabled={isSubmitting}
            {...register("description", {
              required: "A descrição é obrigatória",
              validate: (value) => {
                if (value.trim() === "") {
                  return "A descrição não pode ser vazia"
                }
                return true
              },
            })}
          />
          <div className="flex gap-3">
            <Button
              className="w-full"
              size="large"
              type="button"
              color="secondary"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              className="w-full"
              size="large"
              type="submit"
              disabled={isPending}
            >
              {isPending && <LoadIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func,
}

export default AddTaskDialog
