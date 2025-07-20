import { forwardRef } from "react"

import InputLabel from "./InputLabel"

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="outline-brand-primary border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        {...rest}
        ref={ref}
      />
      {errorMessage && (
        <p className="text-brand-danger text-left text-xs">{errorMessage}</p>
      )}
    </div>
  )
})

export default Input
