import { BotonKazoo } from './BotonKazoo';
import { AccionBotonKazoo } from './AccionBotonKazoo';
import Icon from '@material-ui/core/Icon'
import Router from 'next/router';


export const BotonModoGrabacion = ({ grabacionTerminada, terminarGrabacion, pasarAModoEdicion }) => (
    <BotonKazoo icono={grabacionTerminada ? 'apps' : 'stop' } 
                onClick={ grabacionTerminada ? null : terminarGrabacion}>
        <AccionBotonKazoo onClick={() => Router.push('/pulso')}><Icon>delete</Icon></AccionBotonKazoo>
        <AccionBotonKazoo><Icon>save_alt</Icon></AccionBotonKazoo>
        <AccionBotonKazoo onClick={pasarAModoEdicion}><Icon>edit</Icon></AccionBotonKazoo>
    </BotonKazoo>
)