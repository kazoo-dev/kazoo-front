import { debounce } from 'lodash'
import { memo, useRef, useState, useEffect } from 'react'
import { useTamanioVentana } from '../hooks/useTamanioVentana'
import { Renderer } from 'vexflow/src/renderer'
import { Stave } from 'vexflow/src/stave'
import { StaveNote } from 'vexflow/src/stavenote'
import { StaveTie } from 'vexflow/src/stavetie'
import { Voice } from 'vexflow/src/voice'
import { Accidental } from 'vexflow/src/accidental'
import { Formatter } from 'vexflow/src/formatter'

export default memo(function Partitura({ nombre, tonalidad, metro, compases, scrollea }) {
  const contenedorRef = useRef()
  const lienzoRef = useRef()
  const rendererRef = useRef()
  const [estaAlFinal, setEstaAlFinal] = useState(true)
  useEffect(() => {
    rendererRef.current = new Renderer(lienzoRef.current, Renderer.Backends.SVG)
    // lienzoRef.current
    const cuandoScrolea = debounce(e => {
      setEstaAlFinal(e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight)
    }, 35)
    contenedorRef.current.addEventListener('scroll', cuandoScrolea)
    return contenedorRef.current.removeEventListener('scroll', cuandoScrolea)
  }, [])
  const finDelLienzoRef = useRef()
  const tamanioVentana = useTamanioVentana()
  // useEffect(() => {
  //   rendererRef.current.getContext().clear()
  // }, [tonalidad])
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
      notasDelCompas.forEach(nota => {
        // Estas dos cosas se tiene que solucionar desde el back
        const altura = nota.pitch === 'r' ? 'g/4' : nota.pitch
        const crearNota = duracion => new StaveNote({
          keys: [altura],
          duration: nota.pitch === 'r' ? duracion + 'r' : duracion,
        })
        if (nota.has_tie) {
          const [primeraDuracion, segundaDuracion] = nota.duration
          const primeraNota = crearNota(primeraDuracion)
          notas.push(primeraNota)
          const segundaNota = crearNota(segundaDuracion)
          notas.push(segundaNota)
          ligaduras.push(new StaveTie({
            first_note: primeraNota, first_indices: [0],
            last_note: segundaNota, last_indices: [0]
          }))
        } else {
          notas.push(crearNota(nota.duration))
        }
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
