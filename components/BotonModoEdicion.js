import Icon from '@material-ui/core/Icon';
import { AccionBotonKazoo } from './AccionBotonKazoo';
import { BotonKazoo } from "./BotonKazoo";

export const BotonModoEdicion = ({ abrirSelectorTonalidad, onVolver, modificarAltura }) => (
  <BotonKazoo icono='edit'>
    <AccionBotonKazoo onClick={abrirSelectorTonalidad}>
      <img src="/static/img/armadura-clave.png" alt="Modificar armadura de clave" />
      <style jsx>{`
        img { width: 100%; }
      `}</style>
    </AccionBotonKazoo>
    <AccionBotonKazoo onClick={modificarAltura}><Icon>arrow_upward</Icon></AccionBotonKazoo>
    <AccionBotonKazoo onClick={onVolver}><Icon>cancel</Icon></AccionBotonKazoo>
  </BotonKazoo>
)
