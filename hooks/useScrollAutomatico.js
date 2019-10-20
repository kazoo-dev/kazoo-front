import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

export const useScrollAutomatico = (alturaLienzo, lienzoRef, scrollea, finDelLienzoRef, contenedorRef) => {
  const [estaAlFinal, setEstaAlFinal] = useState(true)
  useEffect(() => {
    lienzoRef.current.style.height = alturaLienzo + 'px'
    if (scrollea && estaAlFinal) {
      finDelLienzoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    const cuandoScrollea = debounce(e => {
      setEstaAlFinal(e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight)
    }, 35)
    contenedorRef.current.addEventListener('scroll', cuandoScrollea)
    return contenedorRef.current.removeEventListener('scroll', cuandoScrollea)
  })
}
