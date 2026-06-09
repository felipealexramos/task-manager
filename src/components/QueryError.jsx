import PropTypes from "prop-types"

import Button from "./Button"

const QueryError = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
      <p className="text-sm text-brand-text-gray">
        {message ?? "Algo deu errado ao carregar os dados."}
      </p>
      {onRetry && (
        <Button size="large" className="w-fit" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  )
}

QueryError.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
}

export default QueryError
