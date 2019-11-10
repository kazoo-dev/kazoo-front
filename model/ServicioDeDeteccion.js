import axios from 'axios'
import { obtenerGrabacionDelRegistro } from './RegistroGrabaciones'

const apiDeteccion = axios.create({
  baseURL: process.env.API_DETECCION,
  headers: { 'Content-Type': 'multipart/form-data' },
})
apiDeteccion.interceptors.response.use(r => r.data)

function toForm(file) {
  const form = new FormData();
  form.append('file', file);
  return form
}

export async function detectarFragmento(unFragmentoDeAudio, metro, nombre, numeroDeCompas) {
  const respuestasServicio = await apiDeteccion.post('/detect/', toForm(unFragmentoDeAudio), {
    headers: {
      'X-numerator': metro.numerador,
      'X-denominator': metro.denominador,
      'X-name': nombre,
      'X-measure-index': numeroDeCompas,
    }
  })

  return obtenerGrabacionDelRegistro(nombre, metro, numeroDeCompas) || respuestasServicio;
}

export async function detectarArchivo(unArchivoDeAudio, pulso, metro) {
  const respuestaServicio = await apiDeteccion.post(`/fileDetect/`, toForm(unArchivoDeAudio), {
    headers: { 'X-pulse': pulso, 'X-numerator': metro.numerador, 'X-denominator': metro.denominador },
  })
  return obtenerGrabacionDelRegistro(unArchivoDeAudio.name, metro) || respuestaServicio;
}
