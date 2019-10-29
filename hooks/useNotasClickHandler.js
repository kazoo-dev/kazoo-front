import { useEffect } from 'react'
import { Vex } from 'vexflow/src/vex'

const vexId = nota => Vex.Prefix(nota.attrs.id)

export const useNotasClickHandlers = (notasGeneradas, callbackNotaClickeada) => {
  useEffect(() => {
    const notasClickHandlers = new Map();

    notasGeneradas.forEach(nota => notasClickHandlers.set(vexId(nota), () => callbackNotaClickeada(nota)))

    const notasDibujadas = [...document.getElementsByClassName('vf-stavenote')]
    notasDibujadas.forEach(n => n.addEventListener('click', notasClickHandlers.get(n.id)))
    return () => notasDibujadas.forEach(n => n.removeEventListener('click', notasClickHandlers.get(n.id)))
  }, [notasGeneradas])
}
