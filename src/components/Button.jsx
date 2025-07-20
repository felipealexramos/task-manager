import { tv } from "tailwind-variants"

const Button = ({
  children,
  color = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-lg px-3 transition hover:opacity-70",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        ghost: "bg-transparent hover:text-brand-dark-grey",
        secondary: "bg-brand-text-grey text-brand-dark-blue",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  })

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  )
}

export default Button
