import { Ripple } from './Ripple';
import { Fragment } from 'react';

export const MarcadorInicioDePulso = () => (
  <Fragment>
    <h1>Pulsá dos veces la pantalla</h1>
    <p>Para marcar el pulso de tu melodía</p>
    <Ripple/>
    <style jsx>{`
      h1, p {
        color: #05396B;
      }    
    `}
    </style>
  </Fragment>
);
