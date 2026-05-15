import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { toast } from "sonner"

import { LoadIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import Select from "./Select"

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const [time, setTime] = useState("morning")
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const titleRef = useRef()
  const descriptionRef = useRef()

  const handleFormSubmit = async () => {
    if (isLoading) return

    const newErrors = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value

    // Validação básica
    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "Esse campo é obrigatório",
      })
    }

    if (!time) {
      newErrors.push({
        inputName: "time",
        message: "Esse campo é obrigatório",
      })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "Esse campo é obrigatório",
      })
    }

    setErrors(newErrors)

    if (newErrors.length > 0) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          time,
          description,
          status: "not_started",
        }),
      })

      if (!response.ok) {
        toast.error("Erro ao adicionar tarefa!")
        return
      }

      const createdTask = await response.json()

      if (onSubmitSuccess) {
        onSubmitSuccess(createdTask)
      }

      if (titleRef.current) titleRef.current.value = ""
      if (descriptionRef.current) descriptionRef.current.value = ""
      setTime("morning")
      setErrors([])

      handleClose()
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (isLoading) return
    titleRef.current.value = ""
    descriptionRef.current.value = ""
    setTime("morning")
    setErrors([])
    handleClose()
  }

  if (!isOpen) return null

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-brand-dark-blue">
          Nova Tarefa
        </h2>
        <p className="mb-4 mt-1 text-brand-text-gray">
          Insira as informações abaixo:
        </p>
        <div className="flex flex-col space-y-4">
          <Input
            id="task-title"
            label="Título"
            placeholder="Insira o título da tarefa"
            errorMessage={titleError?.message}
            ref={titleRef}
            disabled={isLoading}
          />
          <Select
            value={time}
            onChange={(event) => setTime(event.target.value)}
            errorMessage={timeError?.message}
            disabled={isLoading}
          />

          <Input
            id="task-description"
            label="Descrição"
            placeholder="Descrição da tarefa"
            ref={descriptionRef}
            errorMessage={descriptionError?.message}
            disabled={isLoading}
          />
          <div className="flex gap-3">
            <Button
              className="w-full"
              size="large"
              color="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              className="w-full"
              size="large"
              onClick={handleFormSubmit}
              disabled={isLoading}
            >
              {isLoading && <LoadIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </div>
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
