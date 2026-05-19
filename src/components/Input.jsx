import PropTypes from "prop-types"
import React, { forwardRef } from "react"

import InputLabel from "./InputLabel"

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm"
        {...rest}
        ref={ref}
      />
      {errorMessage && (
        <p className="text-left text-xs text-brand-danger">{errorMessage}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

Input.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

export default Input
