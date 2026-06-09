import { Suspense } from "react"
import { Outlet, ScrollRestoration } from "react-router-dom"

import GlobalProgressBar from "./GlobalProgressBar"
import PageLoader from "./PageLoader"

// Layout raiz: barra de progresso global, preserva o scroll ao navegar/voltar
// e exibe um fallback enquanto o chunk da página é baixado (code-splitting).
const RootLayout = () => {
  return (
    <>
      <GlobalProgressBar />
      <ScrollRestoration />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default RootLayout
