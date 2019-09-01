import { Ripple } from './Ripple';
import { Fragment } from 'react';

export const MarcadorFinalDePulso = () => (
  <Fragment>
    <h1>Pulsá nuevamente cuando finalice tu pulso</h1>
    <Ripple/>
    <style jsx>{`
      h1, p {
        color: #05396B;
      }
    `}
    </style>
  </Fragment>
);
