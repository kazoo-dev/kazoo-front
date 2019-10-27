import { memo, useRef } from 'react'
import { useScrollAutomatico } from '../hooks/useScrollAutomatico'
import { useNotasVexflow } from '../hooks/useNotasVexflow'
import { useNotasClickHandlers } from '../hooks/useNotasClickHandler'
import { useVexRenderer } from '../hooks/useVexRenderer'

export default memo(function Partitura({nombre, tonalidad, metro, compases, scrollea, onClickNota = () => {}}) {
  const contenedorRef = useRef()
  const lienzoRef = useRef()
  const finDelLienzoRef = useRef()
  const alturaLienzo = compases.length * 100 + 200
  const renderer = useVexRenderer(lienzoRef)
  useScrollAutomatico(alturaLienzo, lienzoRef, scrollea, finDelLienzoRef, contenedorRef)
  const [_, clickHandlers] = useNotasVexflow(renderer, lienzoRef, compases, nombre, tonalidad, metro, onClickNota)
  useNotasClickHandlers(clickHandlers)
  return (
    <div id="contenedor" ref={contenedorRef}>
      <div id="partitura">
        <div id="lienzo" ref={lienzoRef}/>
      </div>
      <div ref={finDelLienzoRef}/>
      <style jsx global>{`
        text {
          text-transform: uppercase;
          text-anchor: middle;
          text-align: center;
        }
      `}</style>
      <style jsx>{`
        #contenedor {
          display: flex;
          flex-direction: column;
          overflow: scroll;
          height: 100%;
        }
        #partitura {
          flex: 3;
          display: flex;
          padding: 0 10vw;
        }
        #lienzo {
          width: 100%
        }
      `}</style>
    </div>
  )
})
