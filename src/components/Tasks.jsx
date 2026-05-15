import React, { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  AddIcon,
  CloudIcon,
  LoadIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  const [tasksIsLoading, setTasksIsLoading] = useState(true)

  useEffect(() => {
    const fetchedTasks = async () => {
      setTasksIsLoading(true)
      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "GET",
        })
        const tasks = await response.json()
        setTasks(tasks)
      } finally {
        setTasksIsLoading(false)
      }
    }
    fetchedTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === "morning")
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
  const nightTasks = tasks.filter((task) => task.time === "night")

  const onDeleteTaskSuccess = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    toast.success("Tarefa removida com sucesso!")
  }

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false)
  }

  const handleTaskCheckBoxClick = (taskId) => {
    let newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada!")
        return { ...task, status: "in_progress" }
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluída!")
        return { ...task, status: "done" }
      }

      if (task.status === "done") {
        toast.success("Tarefa reiniciada!")
        return { ...task, status: "not_started" }
      }

      return task
    })
    setTasks(newTasks)
  }

  const handleAddTaskSubmit = (task) => {
    setTasks([...tasks, task])
    toast.success("Tarefa adicionada com sucesso!")
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost" disabled={tasksIsLoading}>
            <TrashIcon />
            Limpar Tarefas
          </Button>
          <Button
            onClick={() => setAddTaskDialogIsOpen(true)}
            disabled={tasksIsLoading}
          >
            <AddIcon />
            Nova Tarefa
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={handleDialogClose}
            onSubmitSuccess={handleAddTaskSubmit}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        {tasksIsLoading && (
          <div className="flex items-center justify-center py-10 text-brand-text-gray">
            <LoadIcon className="animate-spin" />
          </div>
        )}
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
