const SideBarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "selected":
        return "bg-brand-primary text-white"
      case "unselected":
        return "hover:bg-brand-primary hover:text-white"
      default:
        return ""
    }
  }

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg p-2 ${getVariantClasses()}`}
    >
      {children}
    </a>
  )
}

export default SideBarButton
