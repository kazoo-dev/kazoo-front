import Icon from '@material-ui/core/Icon';
import Link from 'next/link';
import { AccionBotonKazoo } from './AccionBotonKazoo';
import { BotonKazoo } from './BotonKazoo';
import { getUsuario } from "../lib/Sesion";

export const estaAutenticado = () => getUsuario();

export const BotonModoGrabacion = ({ grabacionTerminada, terminarGrabacion, pasarAModoEdicion, abrirModal, loading }) => {
  const acciones = [
    {
      children: <Link href="/"><Icon>delete</Icon></Link>
    },    
    {
      onClick: pasarAModoEdicion,
      children: <Icon>edit</Icon>
    }
  ]

  if(estaAutenticado()) {
    acciones.push({
      onClick: abrirModal,
      children: <Icon>save_alt</Icon>
    })
  }

  return(
    <BotonKazoo icono={grabacionTerminada ? 'apps' : 'stop'}
      onClick={grabacionTerminada ? null : terminarGrabacion}
      loading={loading}>
      {acciones.map(props => <AccionBotonKazoo {...props}/>)}
    </BotonKazoo>
  )
}
