import * as PropTypes from "prop-types";
import DropzoneDialogCustom from "./Dropzone/DropzoneDialogCustom";
import {BPM} from './BPM';
import {MyButton} from './MyButton';
import {LayoutPreGrabacion} from './LayoutPreGrabacion'
import {MarcadorInicioDePulso} from './MarcadorInicioDePulso'
import {Grabacion} from './Grabacion'


export function ComenzarGrabacion({ pulso, onSiguienteEstado }) {
  return (
    <LayoutPreGrabacion>
      <div id="contenedor">
        <h1>Ya podés empezar la grabación de tu melodía!</h1>
        <BPM style={{ height: '1.5rem' }} pulso={pulso} />
        <div id="botonera">
          <MyButton icon="timer_off" onClick={
            () => onSiguienteEstado(MarcadorInicioDePulso)
          }>Reiniciar</MyButton>
          <MyButton icon='mic' onClick={
            () => onSiguienteEstado(Grabacion, { pulso })
          }>Grabar</MyButton>
          <DropzoneDialogCustom onSave={
            ([file]) => onSiguienteEstado(Grabacion, { pulso, file })
          } />
        </div>
      </div>
      <style jsx>{`
        #contenedor {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #botonera {
          display: flex;
        }
        p {
          font-size: 1.5rem;
        }
        h1 {
          color: #EDF5E0;
          text-align: center;
        }
      `}</style>
    </LayoutPreGrabacion>
  )
}

ComenzarGrabacion.propTypes = {
  pulso: PropTypes.any,
  reiniciarPulso: PropTypes.any
}
