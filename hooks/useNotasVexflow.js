import { useEffect, useState } from 'react'
import { Accidental } from 'vexflow/src/accidental'
import { Formatter } from 'vexflow/src/formatter'
import { compasAVexflow, calcularEnlaces, melodiaAVexflow, notasAVexflow } from '../model/AdaptadorVexflow'
import { useTamanioVentana } from './useTamanioVentana'
import { useVexRenderer } from './useVexRenderer'

const dibujarTodo = (contexto, anchoDibujable, melodia, tonalidad, compas, ligaduras, enlaces) => {
  Accidental.applyAccidentals([melodia], tonalidad)
  new Formatter()
    .joinVoices([melodia])
    .format([melodia], anchoDibujable)
  melodia.draw(contexto, compas)
  ligaduras.forEach(ligadura => ligadura.setContext(contexto).draw())
  compas.setContext(contexto).draw()
  enlaces.forEach(enlace => enlace.setContext(contexto).draw())
}

const obtenerContexto = (renderer, nombre) => {
  const contexto = renderer.getContext()
  contexto.clear()
  contexto.setFont('Roboto', 25, 'italic bold')
  contexto.fillText(nombre, '50%', 50)
  return contexto
}

const obtenerAnchoDibujable = (lienzoRef, compases, renderer) => {
  const anchoLienzo = lienzoRef.current.offsetWidth
  const alturaLienzo = compases.length * 100 + 200
  renderer.resize(anchoLienzo, alturaLienzo)
  return anchoLienzo - 23
}

export const useNotasVexflow = (lienzoRef, compases, nombre, tonalidad, metro, onClickNota) => {
  const renderer = useVexRenderer(lienzoRef)
  const tamanioVentana = useTamanioVentana()
  const notasClickHandlers = new Map()
  let notasTraducidas = []
  const [notasVexflow, setNotasVexflow] = useState([])
  useEffect(() => {
    if (renderer) {
      const anchoDibujable = obtenerAnchoDibujable(lienzoRef, compases, renderer)
      const contexto = obtenerContexto(renderer, nombre)
      compases.forEach((notasDelCompas, numeroDeCompas) => {
        const [notas, ligaduras] = notasAVexflow(notasDelCompas, notasClickHandlers, onClickNota)
        const enlaces = calcularEnlaces(notas)
        const melodia = melodiaAVexflow(metro, notas)
        const compas = compasAVexflow(numeroDeCompas * 100 + 50, anchoDibujable, tonalidad, metro)
        dibujarTodo(contexto, anchoDibujable, melodia, tonalidad, compas, ligaduras, enlaces)
        notasTraducidas = [...notasTraducidas, ...notas]
      })
      setNotasVexflow(notasTraducidas)
    }
  }, [tonalidad, metro, compases, tamanioVentana])
  return [notasVexflow, notasClickHandlers]
}
