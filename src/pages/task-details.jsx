import React, { useEffect, useRef, useState } from "react"
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

const TaskDetailsPage = () => {
  const { id: taskId } = useParams()
  const [task, setTask] = useState(null)
  const navigate = useNavigate()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const [time, setTime] = useState("morning")
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: "GET",
        })
        const data = await response.json()
        setTask(data)
        setTime(data.time)
      } catch (error) {
        console.error("Erro ao buscar tarefa:", error)
      }
    }
    fetchTask()
  }, [taskId])

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
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
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
        toast.error("Erro ao atualizar tarefa!")
        return
      }

      await response.json()

      if (titleRef.current) titleRef.current.value = ""
      if (descriptionRef.current) descriptionRef.current.value = ""
      setTime("morning")
      setErrors([])

      toast.success("Tarefa atualizada com sucesso!")
      handleClose()
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    navigate("/")
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* barra do topo */}
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div>
            <button className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary">
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

          {/* parte da direita */}
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              defaultValue={task?.title}
              error={titleError?.message}
              ref={titleRef}
            />
          </div>

          <div>
            <Select
              value={time}
              onChange={(event) => setTime(event.target.value)}
              error={timeError?.message}
            />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              error={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>

        {/* botão de salvar */}
        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            color="primary"
            onClick={handleFormSubmit}
            disabled={isLoading}
          >
            {isLoading && <LoadIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
