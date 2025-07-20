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
        return "bg-brand-primary text-white"
      case "ghost":
        return "bg-transparent hover:text-brand-dark-grey"
      case "secondary":
        return "bg-brand-text-grey text-brand-dark-blue"
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
