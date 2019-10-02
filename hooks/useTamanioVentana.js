import { useState, useEffect } from 'react'

const getTamanio = el => ({
  ancho: el.innerWidth,
  alto: el.innerHeight,
})

export function useTamanioVentana() {
  const [tamanio, setTamanio] = useState(getTamanio(window))
  useEffect(() => {
    const handleResize = () => setTamanio(getTamanio(window))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window])
  return tamanio
}
