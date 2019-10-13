import { debounce, last, isEmpty } from 'lodash'
import { memo, useEffect, useRef, useState } from 'react'
import { Accidental } from 'vexflow/src/accidental'
import { Formatter } from 'vexflow/src/formatter'
import { Renderer } from 'vexflow/src/renderer'
import { Stave } from 'vexflow/src/stave'
import { StaveNote } from 'vexflow/src/stavenote'
import { StaveTie } from 'vexflow/src/stavetie'
import { Vex } from 'vexflow/src/vex'
import { Voice } from 'vexflow/src/voice'
import { Beam } from 'vexflow/src/beam';
import { useTamanioVentana } from '../hooks/useTamanioVentana'
import { esCorchea, esEnlazable, esSemi, esSilencio } from '../model/Notas';

export default memo(function Partitura({
  nombre, tonalidad, metro, compases, scrollea, onClickNota = () => { }
}) {
  const contenedorRef = useRef()
  const lienzoRef = useRef()
  const rendererRef = useRef()
  const [estaAlFinal, setEstaAlFinal] = useState(true)
  useEffect(() => {
    rendererRef.current = new Renderer(lienzoRef.current, Renderer.Backends.SVG)
    const cuandoScrolea = debounce(e => {
      setEstaAlFinal(e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight)
    }, 35)
    contenedorRef.current.addEventListener('scroll', cuandoScrolea)
    return contenedorRef.current.removeEventListener('scroll', cuandoScrolea)
  }, [])
  const finDelLienzoRef = useRef()
  const tamanioVentana = useTamanioVentana()
  useEffect(() => {
    const anchoLienzo = lienzoRef.current.offsetWidth
    const alturaLienzo = compases.length * 100 + 200
    lienzoRef.current.style.height = alturaLienzo + 'px'
    if (scrollea && estaAlFinal) {
      finDelLienzoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    rendererRef.current.resize(anchoLienzo, alturaLienzo)
    const contexto = rendererRef.current.getContext()
    contexto.clear()
    contexto.setFont('Roboto', 25, 'italic bold')
    contexto.fillText(nombre, '50%', 50)
    const espacioDibujable = anchoLienzo - 23
    compases.map((notasDelCompas, i) => {
      const [x, y] = [0, i * 100 + 50]
      const compas = new Stave(x, y, espacioDibujable)
        .addClef('treble')
        .addKeySignature(tonalidad)
        .addTimeSignature(`${metro.numerador}/${metro.denominador}`)
        .setContext(contexto)
        .draw()
      const notas = []
      const ligaduras = []
      const notasClickHandlersMap = new Map()
      const enlaces = []
      let enlaceActual = []
      let notaAnterior = { duration: '' }
      notasDelCompas.forEach(nota => {
        const notaClickHandler = () => onClickNota({ compas: notasDelCompas, nota })
        const altura = nota.pitch === 'r' ? 'g/4' : nota.pitch
        const agregarNota = duracion => {
          const notaVexflow = new StaveNote({
            keys: [altura],
            duration: nota.pitch === 'r' ? duracion + 'r' : duracion,
          })
          notas.push(notaVexflow)
          notasClickHandlersMap.set(Vex.Prefix(notaVexflow.attrs.id), notaClickHandler)
          return notaVexflow
        }
        if (nota.has_tie) {
          const [primeraDuracion, segundaDuracion] = nota.duration
          ligaduras.push(new StaveTie({
            first_note: agregarNota(primeraDuracion), first_indices: [0],
            last_note: agregarNota(segundaDuracion), last_indices: [0]
          }))
        } else {
          agregarNota(nota.duration)
        }

        if (!esSilencio(nota) && ([nota, notaAnterior].every(esCorchea) || [nota, notaAnterior].every(esSemi))) {
          enlaceActual.push(last(notas))
        } else if (isEmpty(enlaceActual) && esEnlazable(nota)) {
          enlaceActual.push(last(notas))
        } else if (enlaceActual.length > 1  && esEnlazable(nota)) {
          enlaces.push(new Beam(enlaceActual))
          enlaceActual = [last(notas)]
        } else {
          enlaceActual = []
        }
        notaAnterior = nota
      })
      const melodia = new Voice({
        num_beats: metro.numerador,
        beat_value: metro.denominador,
      }).addTickables(notas)
      Accidental.applyAccidentals([melodia], tonalidad)
      new Formatter()
        .joinVoices([melodia])
        .format([melodia], espacioDibujable)
      melodia.draw(contexto, compas)
      ligaduras.forEach(ligadura => ligadura.setContext(contexto).draw())
      enlaces.forEach(enlace => enlace.setContext(contexto).draw())
      const notesDibujadas = [...document.getElementsByClassName('vf-stavenote')]
      notesDibujadas.forEach(
        n => n.addEventListener('click', notasClickHandlersMap.get(n.id))
      )
      return () => notesDibujadas.forEach(
        n => n.removeEventListener('click', notasClickHandlersMap.get(n.id))
      )
    })
  }, [tonalidad, metro, compases, tamanioVentana])
  return (
    <div id="contenedor" ref={contenedorRef}>
      <div id="partitura">
        <div id="lienzo" ref={lienzoRef}></div>
      </div>
      <div ref={finDelLienzoRef} />
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
