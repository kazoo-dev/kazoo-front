import * as PropTypes from "prop-types";
import DropzoneDialogCustom from "./Dropzone/DropzoneDialogCustom";
import {BPM} from './BPM';
import {MyButton} from './MyButton';
import {LayoutPreGrabacion} from './LayoutPreGrabacion'
import {MarcadorInicioDePulso} from './MarcadorInicioDePulso'
import {Grabacion} from './Grabacion'
import {useState} from 'react';
import {SelectorMetro} from './SelectorMetro';
import {Grid, TextField} from '@material-ui/core';


export function ComenzarGrabacion({ pulso, onSiguienteEstado }) {
  const [edicionMetro, setEdicionMetro] = useState(false);
  const [metro, setMetro] = useState({ numerador: 4, denominador: 4});
  const [nombre, setNombre] = useState('');

  return (
    <LayoutPreGrabacion>
      {edicionMetro && <SelectorMetro metro={metro}
                                      alCancelar={() => setEdicionMetro(false)}
                                      alSeleccionar={(metro) => { setMetro(metro); setEdicionMetro(false) } } />}
      <div id="contenedor">
        <h1>Ahora asignale un nombre a la partitura para empezar la grabación de tu melodía!</h1>
        <BPM style={{ height: '1.5rem' }} pulso={pulso} />
        <Grid item xs={12}>
          <TextField
            id="input"
            margin="normal"
            label={"Nombre de la partitura"}
            required={true}
            onChange={(e) => {setNombre(e.target.value) }}
          />
        </Grid>
        <div id="botonera">
          <MyButton icon="timer_off" onClick={() => onSiguienteEstado(MarcadorInicioDePulso)}>
            Reiniciar
          </MyButton>
          <MyButton icon="alarm" onClick={() => setEdicionMetro(true)}>
            Cambiar metro
          </MyButton>
          <DropzoneDialogCustom disabled={ !nombre }
                                onSave={([file]) => onSiguienteEstado(Grabacion, { metro, pulso, file, nombre })} />
          <MyButton icon='mic' disabled={ !nombre } onClick={() => onSiguienteEstado(Grabacion, { metro, pulso, nombre })}>
            Grabar
          </MyButton>
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
