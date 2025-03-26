const SideBarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "selected":
        return "bg-[#00ADB5] text-white"
      case "unselected":
        return "hover:bg-[#00ADB5] hover:text-white"
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
