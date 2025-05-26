const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00ADB5] text-white"
      case "ghost":
        return "bg-transparent hover:text-[#818181]"
      case "secondary":
        return "bg-[#EEEEEE] text-[#35383E]"
    }
  }

  const getSizeClasses = () => {
    if (size === "small") {
      return "py-1 text-xs"
    }

    if (size == "large") {
      return "py-2 text-sm"
    }
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg px-3 transition hover:opacity-70 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
