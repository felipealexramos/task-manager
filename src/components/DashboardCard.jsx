import PropTypes from "prop-types"

const DashboardCard = ({ icon, mainText, secondaryText }) => {
  return (
    <div className="flex h-[150px] w-full flex-col items-center justify-center gap-1 rounded-[10px]">
      <div className="flex items-center gap-2">
        <span className="text-brand-primary">{icon}</span>
        <p className="text-2xl font-semibold text-brand-dark-blue">
          {mainText}
        </p>
      </div>
      <p className="text-gray-500">{secondaryText}</p>
    </div>
  )
}

export default DashboardCard

DashboardCard.propTypes = {
  icon: PropTypes.node.isRequired,
  mainText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
}
