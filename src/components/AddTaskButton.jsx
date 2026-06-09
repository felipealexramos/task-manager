import PropTypes from "prop-types"
import { useState } from "react"

import { AddIcon } from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"

const AddTaskButton = ({
  label = "Nova Tarefa",
  size = "small",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button size={size} className={className} onClick={() => setIsOpen(true)}>
        <AddIcon />
        {label}
      </Button>
      <AddTaskDialog isOpen={isOpen} handleClose={() => setIsOpen(false)} />
    </>
  )
}

AddTaskButton.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(["small", "large"]),
  className: PropTypes.string,
}

export default AddTaskButton
