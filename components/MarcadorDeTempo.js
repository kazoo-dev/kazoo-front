import { useState } from 'react'
import { Temas } from '../model/Temas'
import { crearGrabadorDeAudio } from '../model/crearGrabadorDeAudio'
import { MyButton } from './MyButton'

const { rojo, naranja, verde, azul } = Temas

export function MarcadorDeTempo() {
  const [inicioDelTempo, setInicioDelTempo] = useState()
  const [tempo, setTempo] = useState()
  const [grabador, setGrabador] = useState()
  const reiniciar = () => (setInicioDelTempo(), setTempo(), setGrabador())
  const guardarTempo = () => setTempo(Date.now() - inicioDelTempo)
  const iniciarTempo = () => setInicioDelTempo(Date.now())
  const iniciarGrabacion = async () => setGrabador(await crearGrabadorDeAudio(tempo * 4))
  const terminarGrabacion = () => (grabador.stop(), setGrabador())
  return (
    <div>
      {tempo
        ? <MyButton icon="timer_off" theme={verde} onClick={reiniciar}>REINICIAR</MyButton>
        : inicioDelTempo
          ? <MyButton icon="av_timer" theme={naranja} onClick={guardarTempo}>MARCANDO...</MyButton>
          : <MyButton icon="timer" theme={rojo} onClick={iniciarTempo}>MARCAR TIEMPO</MyButton>
      }
      {tempo
        ? grabador
          ? <MyButton icon="mic_off" theme={azul} onClick={terminarGrabacion}>DETENER</MyButton>
          : <MyButton icon="mic" theme={verde} onClick={iniciarGrabacion}>GRABAR AUDIO</MyButton>
        : <MyButton icon="mic_none" disabled={true}>GRABAR AUDIO</MyButton>
      }
    </div>
  )
}
