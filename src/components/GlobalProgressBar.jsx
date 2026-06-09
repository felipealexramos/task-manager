import { useIsFetching, useIsMutating } from "@tanstack/react-query"

// Barra de progresso discreta no topo (estilo GitHub/YouTube).
// Como os dados são buscados via React Query (não via loaders de rota),
// o sinal de "carregando" vem de fetches/mutações em andamento.
const GlobalProgressBar = () => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  if (isFetching + isMutating === 0) return null

  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 w-full overflow-hidden"
      role="progressbar"
      aria-label="Carregando"
    >
      <div className="animate-indeterminate-progress h-full w-1/3 bg-brand-primary" />
    </div>
  )
}

export default GlobalProgressBar
