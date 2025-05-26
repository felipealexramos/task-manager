import { createPortal } from "react-dom"

import Button from "./Button"
import Input from "./Input"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[35383E]">Nova Tarefa</h2>
        <p className="mb-4 mt-1 text-[#9A9A9A]">
          Insira as informações abaixo:
        </p>
        <div className="flex flex-col space-y-4">
          <Input
            id="title"
            label="Título"
            placeholder="Insira o título da tarefa"
          />
          <Input id="time" label="Horário" placeholder="Horário" />
          <Input
            id="title"
            label="Descrição"
            placeholder="Descrição da tarefa"
          />
          <div className="flex gap-3">
            <Button
              className="w-full"
              size="large"
              variant="secondary"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button className={"w-full"} size="large">
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
