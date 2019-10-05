import axios from 'axios';

const apiDeteccion = axios.create({
  baseURL: 'https://kazoo-back.herokuapp.com',
  headers: { 'Content-Type': 'multipart/form-data' },
})
apiDeteccion.interceptors.response.use(r => r.data)

function toForm(file) {
  const form = new FormData();
  form.append('file', file);
  return form
}

export function detectarFragmento(unFragmentoDeAudio) {
  return apiDeteccion.post(`/detect/`, toForm(unFragmentoDeAudio))
}

export function detectarArchivo(unArchivoDeAudio, pulso) {
  return apiDeteccion.post(`/fileDetect/`, toForm(unArchivoDeAudio), {
    headers: { 'X-pulse': pulso },
  })
}
