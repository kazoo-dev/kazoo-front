import { useEffect } from 'react'

export const useNotasClickHandlers = notasClickHandlers => {
  useEffect(() => {
    const notasDibujadas = [...document.getElementsByClassName('vf-stavenote')]

    notasDibujadas.forEach(
      n => n.addEventListener('click', notasClickHandlers.get(n.id))
    )

    return () => notasDibujadas.forEach(
      n => n.removeEventListener('click', notasClickHandlers.get(n.id))
    )
  })
}
