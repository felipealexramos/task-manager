import PropTypes from "prop-types"

const Skeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-brand-light-gray ${className ?? ""}`}
    />
  )
}

Skeleton.propTypes = {
  className: PropTypes.string,
}

export default Skeleton
