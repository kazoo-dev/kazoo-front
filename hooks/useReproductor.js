import { Reproductor } from '../model/Reproductor'
import { useEffect, useState } from 'react'

export const useReproductor = (bpm, notas) => {
  const playInfo = {
    clef: 'treble',
    delay: 0,
    rpm: bpm,
    defaultTime: (bpm / 60) // to seconds
  }

  const [reproductor, setReproductor] = useState()
  const [reproduciendo, setReproduciendo] = useState()

  useEffect(() => {
    setReproductor(new Reproductor())
  }, [])

  const reproducir = () => {
    if (reproductor) {
      const eventos = notas.flatMap(nota => nota.getPlayEvents(playInfo))
      console.log(eventos)
      reproductor.addEvents(eventos)
      reproductor.onPlayFinished(() => setReproduciendo(false))
      setReproduciendo(true)
      reproductor.play()
    }
  }

  const detener = () => {
    setReproduciendo(false)
    reproductor.stop()
  }

  return [reproducir, detener, reproduciendo]
}
