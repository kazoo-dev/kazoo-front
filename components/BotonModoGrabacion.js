import Icon from '@material-ui/core/Icon';
import Link from 'next/link';
import { AccionBotonKazoo } from './AccionBotonKazoo';
import { BotonKazoo } from './BotonKazoo';

export const BotonModoGrabacion = ({ grabacionTerminada, terminarGrabacion, pasarAModoEdicion, abrirModal }) => (
  <BotonKazoo icono={grabacionTerminada ? 'apps' : 'stop'}
    onClick={grabacionTerminada ? null : terminarGrabacion}>
    <AccionBotonKazoo><Link href="/"><Icon>delete</Icon></Link></AccionBotonKazoo>
    <AccionBotonKazoo onClick={abrirModal}><Icon>save_alt</Icon></AccionBotonKazoo>
    <AccionBotonKazoo onClick={pasarAModoEdicion}><Icon>edit</Icon></AccionBotonKazoo>
  </BotonKazoo>
)
