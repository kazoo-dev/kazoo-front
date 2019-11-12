import { cancionEnMi } from './Grabaciones/CancionEnMi'
import { cancionEnMiGrabacion } from './Grabaciones/CancionEnMiGrabacion'
import { muestra } from './Grabaciones/Muestra'
import { cancionEnSol } from './Grabaciones/CancionEnSol'

const RegistroGrabaciones = {
  '4/4': {
    'cancionenmi': cancionEnMi,
    'prueba': cancionEnMiGrabacion,
    'prueba1': cancionEnMiGrabacion,
    'pruebauno': cancionEnMiGrabacion,
    'demo': cancionEnMiGrabacion,
    'demouno': cancionEnMiGrabacion,
    'demo1': cancionEnMiGrabacion,
    'muestra': muestra,
  },
  '2/4': {
    'cancionensol': cancionEnSol,
  },
}

const indiceDeMetro = ({ numerador, denominador }) => `${numerador}/${denominador}`

const quitarExtension = nombreArchivo =>
  nombreArchivo.includes('.') ? nombreArchivo.split('.').slice(0, -1).join('.') : nombreArchivo;


const sanitizar = nombreDeGrabacion =>
  quitarExtension(nombreDeGrabacion)
    .normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-., _]/g, '')

export const obtenerGrabacionDelRegistro = (nombre, metro, numeroCompas) => {
  const registroPorMetro = RegistroGrabaciones[indiceDeMetro((metro))]

  if (!registroPorMetro)
    return;

  const grabacion = registroPorMetro[sanitizar(nombre)]

  if (numeroCompas === undefined)
    return grabacion;

  return grabacion ? grabacion[numeroCompas] : null;
}
