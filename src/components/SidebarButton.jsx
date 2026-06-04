import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

const SideBarButton = ({ children, color, href }) => {
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
    <a href={href} className={`${sidebar({ color })}`}>
      {children}
    </a>
  )
}

SideBarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["selected", "unselected"]),
  href: PropTypes.string.isRequired,
}

export default SideBarButton
