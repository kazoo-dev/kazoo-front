import { Onda } from './Onda';
import { LayoutPreGrabacion } from './LayoutPreGrabacion'
import { MarcadorFinalDePulso } from './MarcadorFinalDePulso'

export const MarcadorInicioDePulso = ({ onSiguienteEstado }) => (
  <LayoutPreGrabacion onClick={
    () => onSiguienteEstado(MarcadorFinalDePulso, { inicioDelPulso: Date.now() })
  }>
    <h1>Pulsá dos veces la pantalla</h1>
    <p>Para marcar el pulso de tu melodía</p>
    <Onda/>
    <style jsx>{`
      h1, p {
        color: #EDF5E0;
        text-align: center;
      }
    `}</style>
  </LayoutPreGrabacion>
);
