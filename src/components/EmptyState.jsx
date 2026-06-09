import PropTypes from "prop-types"

const EmptyState = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <h4 className="text-lg font-semibold text-brand-dark-blue">{title}</h4>
      <p className="max-w-sm text-sm text-brand-text-gray">{description}</p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.node,
}

export default EmptyState
