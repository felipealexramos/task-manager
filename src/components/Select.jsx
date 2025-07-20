import InputLabel from "./InputLabel"

const Select = (props) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="outline-brand-primary border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {props.errorMessage && (
        <p className="text-left text-xs text-red-500">{props.errorMessage}</p>
      )}
    </div>
  )
}

export default Select
