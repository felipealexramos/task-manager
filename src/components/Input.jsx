const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <label className="tet-[#3538E] text-sm font-semibold" htmlFor={rest.id}>
        {label}
      </label>
      <input
        id=""
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm"
        {...rest}
      />
    </div>
  )
}

export default Input
