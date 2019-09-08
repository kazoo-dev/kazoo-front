import React from 'react';
import { MarcadorInicioDePulso } from '../components/MarcadorInicioDePulso';
import { MarcadorFinalDePulso } from '../components/MarcadorFinalDePulso';
import { ComenzarGrabacion } from '../components/ComenzarGrabacion';
import Layout from '../components/Layout';

const noop = () => {
};

export default class PaginaMarcarPulso extends React.Component {
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
      <Layout>
        <div id="pulso" onClick={onClick}>
          <Mensaje pulso={pulso} reiniciarPulso={this.reiniciarPulso.bind(this)} />
        </div>
        <style jsx> {`
          #contenedor {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          #pulso {
            height: 100%;
            background-color: #5CDB94;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
        </style>
      </Layout>
    );
  }
};
