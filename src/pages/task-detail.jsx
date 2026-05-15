import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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
  return <h1>{task?.title}</h1>
}

export default TaskDetailsPage
