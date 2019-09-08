import { Onda } from './Onda';
import { Fragment } from 'react';

export const MarcadorInicioDePulso = () => (
  <Fragment>
    <h1>Pulsá dos veces la pantalla</h1>
    <p>Para marcar el pulso de tu melodía</p>
    <Onda/>
    <style jsx>{`
      h1, p {
        color: #EDF5E0;
        text-align: center;
      }    
    `}
    </style>
  </Fragment>
);
