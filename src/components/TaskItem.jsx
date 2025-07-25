import { CheckIcon, DetailsIcon, LoadIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

const TaskItem = ({ task, handleCheckBoxClick, handleDeleteClick }) => {
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
            className="absolute h-7 w-7 cursor-pointer"
            checked={task.status === "done"}
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
        >
          <TrashIcon className="text-brand-text-grey" />
        </Button>
        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
