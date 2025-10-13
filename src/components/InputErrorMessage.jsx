const InputErrorMessage = ({ children }) => {
  return <p className="mt-1 text-sm text-red-600">{children}</p>
}

InputErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default InputErrorMessage