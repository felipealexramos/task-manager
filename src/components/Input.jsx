import InputLabel from "./InputLabel"

const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        id=""
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm"
        {...rest}
      />
    </div>
  )
}

export default Input
