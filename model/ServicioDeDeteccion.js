import axios from 'axios';

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

export function detectarFragmento(unFragmentoDeAudio, metro) {
  return apiDeteccion.post(`/detect/`, toForm(unFragmentoDeAudio), {
    headers: { 'X-numerator': metro.numerador, 'X-denominator': metro.denominador }
  })
}

export function detectarArchivo(unArchivoDeAudio, pulso, metro) {
  return apiDeteccion.post(`/fileDetect/`, toForm(unArchivoDeAudio), {
    headers: { 'X-pulse': pulso, 'X-numerator': metro.numerador, 'X-denominator': metro.denominador },
  })
}
