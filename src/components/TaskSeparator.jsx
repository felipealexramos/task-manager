import PropTypes from "prop-types"

const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="border-brand-border mb-2 flex items-center gap-2 border-b border-solid pb-1 text-sm">
      {icon}
      <p className="text-brand-text-grey">{title}</p>
    </div>
  )
}

TaskSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default TaskSeparator
