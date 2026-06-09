import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom"

import Button from "./Button"

const RouteError = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  const title = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : "Algo deu errado"

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-brand-background px-6 text-center">
      <h1 className="text-2xl font-semibold text-brand-dark-blue">{title}</h1>
      <p className="max-w-md text-brand-text-gray">
        Não foi possível carregar esta página. Tente novamente em alguns
        instantes.
      </p>
      <div className="flex gap-3">
        <Button size="large" color="secondary" onClick={() => navigate("/")}>
          Voltar ao início
        </Button>
        <Button size="large" onClick={() => navigate(0)}>
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}

export default RouteError
