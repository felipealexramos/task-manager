import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Select from "../components/Select"
import SideBar from "../components/Sidebar"

const TaskDetailsPage = () => {
  const { id: taskId } = useParams()
  const [task, setTask] = useState(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: "GET",
        })
        const data = await response.json()
        setTask(data)
      } catch (error) {
        console.error("Erro ao buscar tarefa:", error)
      }
    }
    fetchTask()
  }, [taskId])

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
            <Input id="title" label="Título" defaultValue={task?.title} />
          </div>

          <div>
            <Select defaultValue={task?.time} />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
            />
          </div>
        </div>

        {/* botão de salvar */}
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
