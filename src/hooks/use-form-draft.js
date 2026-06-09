import { useEffect } from "react"

// Lê um rascunho salvo do localStorage
export const getFormDraft = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Remove o rascunho (ex: após envio bem-sucedido).
export const clearFormDraft = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignora erros de acesso ao storage
  }
}

// Persiste o estado do formulário no localStorage a cada alteração,
// para que o progresso não seja perdido em reload/queda de conexão.
export const useFormDraft = (key, watch) => {
  useEffect(() => {
    const subscription = watch((values) => {
      try {
        localStorage.setItem(key, JSON.stringify(values))
      } catch {
        // ignora erros de escrita (storage cheio/desabilitado)
      }
    })
    return () => subscription.unsubscribe()
  }, [key, watch])
}
