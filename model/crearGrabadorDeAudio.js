import msr from 'msr'
import axios from 'axios';

const config = { headers: { 'Content-Type': 'multipart/form-data' } }

export async function crearGrabadorDeAudio(compas) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const chunks = []
  const recorder = new msr(stream)
  recorder.mimeType = 'audio/wav',
  recorder.ondataavailable = async blob => {
    const formData = new FormData()
    formData.append('file', new File([blob], 'file.wav', { type: 'audio/wav' }))
    const response = await axios.post('https://kazoo-back.herokuapp.com/detect/', formData, config)
    console.log(response)
  }
  if (compas) await recorder.start(compas)
  return recorder
}
