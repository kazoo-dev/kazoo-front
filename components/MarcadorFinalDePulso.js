import { Onda } from './Onda';
import { Fragment } from 'react';

export const MarcadorFinalDePulso = () => (
  <Fragment>
    <h1>Pulsá nuevamente cuando finalice tu pulso</h1>
    <Onda/>
    <style jsx>{`
      h1, p {
        color: #05396B;
        text-align: center;
      }
    `}
    </style>
  </Fragment>
);
