import * as PropTypes from "prop-types";
import DropzoneDialogCustom from "./Dropzone/DropzoneDialogCustom";
import {BPM} from './BPM';
import {MyButton} from './MyButton';
import {LayoutPreGrabacion} from './LayoutPreGrabacion'
import {MarcadorInicioDePulso} from './MarcadorInicioDePulso'
import {Grabacion} from './Grabacion'
import { useState } from 'react';
import { SelectorMetro } from './SelectorMetro';


export function ComenzarGrabacion({ pulso, onSiguienteEstado }) {
  const [edicionMetro, setEdicionMetro] = useState(false);
  const [metro, setMetro] = useState({ numerador: 4, denominador: 4});

  return (
    <LayoutPreGrabacion>
      {edicionMetro && <SelectorMetro metro={metro}
                                      alCancelar={() => setEdicionMetro(false)}
                                      alSeleccionar={(metro) => { setMetro(metro); setEdicionMetro(false) } } />}
      <div id="contenedor">
        <h1>Ya podés empezar la grabación de tu melodía!</h1>
        <BPM style={{ height: '1.5rem' }} pulso={pulso} />
        <div id="botonera">
          <MyButton icon="timer_off" onClick={
            () => onSiguienteEstado(MarcadorInicioDePulso)
          }>Reiniciar</MyButton>
          <MyButton icon='mic' onClick={
            () => onSiguienteEstado(Grabacion, { metro, pulso })
          }>Grabar</MyButton>
          <MyButton icon="alarm" onClick={() => setEdicionMetro(true)}>Cambiar metro</MyButton>
          <DropzoneDialogCustom onSave={
            ([file]) => onSiguienteEstado(Grabacion, { metro, pulso, file })
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
        
        @media only screen and (max-width: 767px) {
          #botonera {
            flex-direction: column;
            justify-content: center;
          }
        }
      `}</style>
    </LayoutPreGrabacion>
  )
}

ComenzarGrabacion.propTypes = {
  pulso: PropTypes.any,
  reiniciarPulso: PropTypes.any
}
