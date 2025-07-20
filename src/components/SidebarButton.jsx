import { tv } from "tailwind-variants"

const SideBarButton = ({ children, color }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3 text-brand-primary",
    variants: {
      color: {
        selected: "bg-brand-primary text-white",
        unselected: "text-brand-dark-blue",
      },
    },
    defaultVariants: {
      color: "unselected",
    },
  })

  return (
    <a href="#" className={`${sidebar({ color })}`}>
      {children}
    </a>
  )
}

export default SideBarButton
