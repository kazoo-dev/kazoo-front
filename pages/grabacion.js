import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import Nota from '../components/Nota';
import React from 'react';
import Grabador from '../model/Grabador';
import ServicioDeDeteccion from '../model/ServicioDeDeteccion';
import { MyButton } from '../components/MyButton';
import { Temas } from '../model/Temas';

const Partitura = dynamic(() => import('../components/Partitura'), { ssr: false });
const Compas = dynamic(() => import('../components/Compas'), { ssr: false });

const { azul } = Temas;

class PaginaDeGrabacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compases: [] };
  }

  componentDidMount() {
    const pulso = this.props.router.query.pulso;
    Grabador.iniciarGrabacion(4 * pulso, this.procesarCompas.bind(this));
  }

  procesarCompas(unAudio) {
    ServicioDeDeteccion.detectar(unAudio).then(this.agregarCompas.bind(this));
  }

  terminarGrabacion() {
    Grabador.terminarGrabacion();
  }

  agregarCompas(unCompas) {
    const compases = [...this.state.compases, unCompas];
    this.setState({ compases });
  }

  dibujarCompas(unCompas, unaClave) {
    return (
      <Compas key={unaClave}>
        {unCompas.map((nota, i) => <Nota key={i} altura={nota.pitch} duracion={nota.duration} ligada={nota.has_tie}
                                         puntillo={nota.has_dot}/>)}
      </Compas>
    );
  }

  render() {
    return (
      <div id="contenedor">
        <div id="partituras">
          <Partitura metro='4/4' compases={this.state.compases}>
            {this.state.compases.map((compas, i) => this.dibujarCompas(compas, i))}
          </Partitura>
        </div>
        <MyButton icon={'mic_off'} theme={azul}  onClick={this.terminarGrabacion.bind(this)}>DETENER</MyButton>
        <style jsx>{`
          #contenedor {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          #partituras {
            flex: 3;
            display: flex;
          }
        `}
        </style>
      </div>
    );
  }
}

export default withRouter(PaginaDeGrabacion);
