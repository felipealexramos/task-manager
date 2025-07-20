import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { v4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import Select from "./Select"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [time, setTime] = useState("morning")
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const descriptionRef = useRef()

  const handleFormSubmit = () => {
    const newErrors = []

    console.log(titleRef.current.value)

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

    // Criar a tarefa
    const newTask = {
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    }

    handleSubmit(newTask)

    // Limpar o formulário e erros
    if (titleRef.current) titleRef.current.value = ""
    if (descriptionRef.current) descriptionRef.current.value = ""
    setTime("morning")
    setErrors([])

    handleClose()
  }

  const handleCancel = () => {
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
        <p className="text-brand-text-gray mb-4 mt-1">
          Insira as informações abaixo:
        </p>
        <div className="flex flex-col space-y-4">
          <Input
            id="task-title"
            label="Título"
            placeholder="Insira o título da tarefa"
            errorMessage={titleError?.message}
            ref={titleRef}
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
            ref={descriptionRef}
            errorMessage={descriptionError?.message}
          />
          <div className="flex gap-3">
            <Button
              className="w-full"
              size="large"
              color="secondary"
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
