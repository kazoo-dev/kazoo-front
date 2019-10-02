import { Onda } from './Onda';
import { LayoutPreGrabacion } from './LayoutPreGrabacion'
import { ComenzarGrabacion } from './ComenzarGrabacion'

export const MarcadorFinalDePulso = ({ onSiguienteEstado, inicioDelPulso }) => (
  <LayoutPreGrabacion onClick={
    () => onSiguienteEstado(ComenzarGrabacion, { pulso: Date.now() - inicioDelPulso })
  }>
    <h1>Pulsá nuevamente cuando finalice tu pulso</h1>
    <Onda/>
    <style jsx>{`
      h1, p {
        color: #EDF5E0;
        text-align: center;
      }
    `}</style>
  </LayoutPreGrabacion>
);
