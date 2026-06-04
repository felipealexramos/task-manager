import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { tv } from "tailwind-variants"

const SideBarButton = ({ children, to }) => {
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
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? "selected" : "unselected" })
      }
    >
      {children}
    </NavLink>
  )
}

SideBarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["selected", "unselected"]),
  to: PropTypes.string.isRequired,
}

export default SideBarButton
