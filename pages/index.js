import React from 'react';
import {MarcadorInicioDePulso} from '../components/MarcadorInicioDePulso';
import {MarcadorFinalDePulso} from '../components/MarcadorFinalDePulso';
import {ComenzarGrabacion} from '../components/ComenzarGrabacion';
import { redirigirSiNoEstaAutenticado } from '../components/Auth';

const noop = () => {
};

class PaginaMarcarPulso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  guardarInicioDelPulso() {
    this.setState({ inicioDelPulso: Date.now() });
  }

  guardarPulso() {
    const inicioDelPulso = this.state.inicioDelPulso;
    this.setState({ pulso: Date.now() - inicioDelPulso });
  }

  reiniciarPulso() {
    this.setState({ pulso: undefined, inicioDelPulso: undefined });
  }

  render() {
    const { inicioDelPulso, pulso } = this.state;
    let onClick;
    let Mensaje;

    if (pulso) {
      Mensaje = ComenzarGrabacion;
      onClick = noop;
    } else if (inicioDelPulso) {
      Mensaje = MarcadorFinalDePulso;
      onClick = this.guardarPulso.bind(this);
    } else {
      Mensaje = MarcadorInicioDePulso;
      onClick = this.guardarInicioDelPulso.bind(this);
    }

    return (
      <div id="pulso" onClick={onClick}>
        <Mensaje pulso={pulso} reiniciarPulso={this.reiniciarPulso.bind(this)} />
        <style jsx> {`
          #pulso {
            height: 100%;
            background-color: #389583;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
        </style>
      </div>
    );
  }
};

export default redirigirSiNoEstaAutenticado(PaginaMarcarPulso)
