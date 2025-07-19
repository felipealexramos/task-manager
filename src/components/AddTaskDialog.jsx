import { useState } from "react"
import { createPortal } from "react-dom"
import { v4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import Select from "./Select"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [time, setTime] = useState("morning")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState([])

  const handleFormSubmit = () => {
    const newErrors = []

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

    // Criar a tarefa
    const newTask = {
      id: v4(),
      title: title.trim(),
      time,
      description: description.trim(),
      status: "not_started",
    }

    handleSubmit(newTask)

    // Limpar o formulário e erros
    setTitle("")
    setDescription("")
    setTime("morning")
    setErrors([])

    handleClose()
  }

  const handleCancel = () => {
    setTitle("")
    setDescription("")
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
        <h2 className="text-xl font-semibold text-[35383E]">Nova Tarefa</h2>
        <p className="mb-4 mt-1 text-[#9A9A9A]">
          Insira as informações abaixo:
        </p>
        <div className="flex flex-col space-y-4">
          <Input
            id="task-title"
            label="Título"
            placeholder="Insira o título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            errorMessage={titleError?.message}
          />
          <Select
            value={time}
            onChange={(event) => setTime(event.target.value)}
            errorMessage={timeError?.message}
          />

          <Input
            id="task-description"
            label="Descrição"
            placeholder="Descrição da tarefa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            errorMessage={descriptionError?.message}
          />
          <div className="flex gap-3">
            <Button
              className="w-full"
              size="large"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button className="w-full" size="large" onClick={handleFormSubmit}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
