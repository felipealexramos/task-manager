const Button = ({ children, variant = "primary", ...rest }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00ADB5] text-white"
      case "ghost":
        return "bg-transparent hover:text-[#818181]"
    }
  }

  return (
    <button
      className={`flex items-center gap-2 rounded-lg p-2 transition hover:opacity-70 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
