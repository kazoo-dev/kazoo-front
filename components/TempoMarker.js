import { useState } from 'react'
import { Themes } from '../model/Themes'
import { createAudioRecorder } from '../model/recordAudio'
import { MyButton } from './MyButton'

const { red, orange, green, blue } = Themes

export function TempoMarker() {
  const [tempoStart, setTempoStart] = useState()
  const [tempo, setTempo] = useState()
  const [recorder, setRecorder] = useState()
  const [audio, setAudio] = useState()
  const restart = () => (setTempoStart(), setTempo(), setRecorder(), setAudio())
  const recordTempo = () => setTempo(Date.now() - tempoStart)
  const startTempo = () => setTempoStart(Date.now())
  const startRecording = async () => (setRecorder(await createAudioRecorder(true)), setAudio())
  const stopRecording = async () => (setAudio(await recorder.stop()), setRecorder())
  return (
    <div>
      {tempo
        ? <MyButton icon="timer_off" theme={green} onClick={restart}>REINICIAR</MyButton>
        : tempoStart
          ? <MyButton icon="av_timer" theme={orange} onClick={recordTempo}>MARCANDO...</MyButton>
          : <MyButton icon="timer" theme={red} onClick={startTempo}>MARCAR TIEMPO</MyButton>
      }
      {tempo
        ? recorder
          ? <MyButton icon="mic_off" theme={blue} onClick={stopRecording}>DETENER</MyButton>
          : <MyButton icon="mic" theme={green} onClick={startRecording}>GRABAR AUDIO</MyButton>
        : <MyButton icon="mic_none" disabled={true}>GRABAR AUDIO</MyButton>
      }
      <MyButton icon="play_arrow" disabled={!audio} theme={green} onClick={() => audio.play()}>ESCUCHAR</MyButton>
    </div>
  )
}
