import Icon from '@material-ui/core/Icon';
import Link from 'next/link';
import { AccionBotonKazoo } from './AccionBotonKazoo';
import { BotonKazoo } from './BotonKazoo';
import { getUsuario } from "../lib/Sesion";

export const BotonModoGrabacion = ({ grabacionTerminada, terminarGrabacion, pasarAModoEdicion, guardarPartitura, loading }) => (
  <BotonKazoo icono={grabacionTerminada ? 'apps' : 'stop'}
    onClick={grabacionTerminada ? null : terminarGrabacion}
    loading={loading}>

    <AccionBotonKazoo><Link href="/"><Icon>delete</Icon></Link></AccionBotonKazoo>
    { getUsuario() && <AccionBotonKazoo onClick={guardarPartitura}><Icon>save_alt</Icon></AccionBotonKazoo> }
    <AccionBotonKazoo onClick={pasarAModoEdicion}><Icon>edit</Icon></AccionBotonKazoo>
  </BotonKazoo>
)
