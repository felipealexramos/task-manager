import PropTypes from "prop-types"
import React from "react"
import { createPortal } from "react-dom"

import { LoadIcon } from "../assets/icons"
import Button from "./Button"

const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="max-w-sm rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-brand-dark-blue">{title}</h2>
        <p className="mb-4 mt-1 text-brand-text-gray">{description}</p>
        <div className="flex gap-3">
          <Button
            className="w-full"
            size="large"
            type="button"
            color="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            className="w-full"
            size="large"
            type="button"
            color="danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <LoadIcon className="animate-spin" />}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ConfirmDialog
