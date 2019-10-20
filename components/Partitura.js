import { memo, useRef } from 'react'
import { useScrollAutomatico } from '../hooks/useScrollAutomatico'
import { useNotasVexflow } from '../hooks/useNotasVexflow'
import { useNotasClickHandlers } from '../hooks/useNotasClickHandler'
import { useReproductor } from '../hooks/useReproductor'
import { conversorPulsoBPM } from '../model/Bpm'
import { LinkReproduccion } from './LinkReproduccion'
import('../model/VexflowExtensions')

export default memo(function Partitura({nombre, tonalidad, metro, compases, scrollea, pulso, onClickNota = () => {}}) {
  const contenedorRef = useRef()
  const lienzoRef = useRef()
  const finDelLienzoRef = useRef()
  const alturaLienzo = compases.length * 100 + 200
  useScrollAutomatico(alturaLienzo, lienzoRef, scrollea, finDelLienzoRef, contenedorRef)
  const [notasVexflow, clickHandlers] = useNotasVexflow(lienzoRef, compases, nombre, tonalidad, metro, onClickNota)
  console.log(notasVexflow)
  useNotasClickHandlers(clickHandlers)
  const [reproducir, detener, estaReproduciendo] = useReproductor(conversorPulsoBPM(pulso), notasVexflow)

  return (
    <div id="contenedor" ref={contenedorRef}>
      <div id="partitura">
        <div id="lienzo" ref={lienzoRef}/>
        {estaReproduciendo ?
          <LinkReproduccion icono="stop" onClick={detener}>Detener</LinkReproduccion> :
          <LinkReproduccion icono="play_arrow" mostrar={notasVexflow.length} onClick={reproducir}>Reproducir</LinkReproduccion>
        }
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
          display: flex;
          width: 100%
        }
      `}</style>
    </div>
  )
})
