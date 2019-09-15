import { Fragment } from 'react';

const radio = 70;

export const AccionBotonKazoo = ({ className, indice, clickeado, children, total, ...props}) =>
  <Fragment>
    <div className={`accion accion-${indice} ${clickeado ? 'on' : ''} ${className || ''}`} { ...props }>{ children }</div>
    <style jsx>{`
      .accion {
        display: flex;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #5CDB94;
        transition: transform 300ms ease-out;
        z-index: -1;
      }
      
      .on.accion {
        transform: translate3d(${Math.cos((total - indice) * Math.PI / (total + 1)) * radio}px, -${Math.sin((total - indice) * Math.PI / (total + 1)) * radio}px, 0);
      }
    `}</style>
  </Fragment>;

