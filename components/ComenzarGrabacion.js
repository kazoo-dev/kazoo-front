import { BPM } from './BPM';
import Link from 'next/link';
import { MyButton } from './MyButton';

export const ComenzarGrabacion = ({ pulso, reiniciarPulso }) => (
  <div id="contenedor">
    <h1>Ya podés empezar la grabación de tu melodía!</h1>
    <BPM style={{ height: '1.5rem' }} pulso={pulso}/>
    <div id="botonera">
      <MyButton icon="timer_off" onClick={reiniciarPulso}>Reiniciar</MyButton>
      <Link href={`/record?pulso=${pulso}`} as="/grabacion">
        <MyButton icon='mic'>Grabar</MyButton>
      </Link>
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
    `}
    </style>
  </div>
);
