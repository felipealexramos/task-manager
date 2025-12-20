import InputLabel from "./InputLabel"
import PropTypes from "prop-types"

const Select = ({ errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="outline-brand-primary border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        {...rest} 
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

Select.propTypes = {
  errorMessage: PropTypes.string,
}

export default Select