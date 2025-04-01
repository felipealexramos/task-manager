const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="mb-2 flex items-center gap-2 border-b border-solid border-[#E5E5E5] pb-1 text-sm">
      {icon}
      <p className="text-[#9A9C9F]">{title}</p>
    </div>
  )
}

export default TaskSeparator
