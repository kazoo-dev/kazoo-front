import dynamic from 'next/dynamic';
import Router, { withRouter } from 'next/router';
import Nota from '../components/Nota';
import React from 'react';
import Grabador from '../model/Grabador';
import ServicioDeDeteccion from '../model/ServicioDeDeteccion';
import Layout from '../components/Layout';
import { BotonKazoo } from '../components/BotonKazoo';
import { AccionBotonKazoo } from '../components/AccionBotonKazoo'
import Icon from '@material-ui/core/Icon'

const Partitura = dynamic(() => import('../components/Partitura'), { ssr: false });
const Compas = dynamic(() => import('../components/Compas'), { ssr: false });

class PaginaDeGrabacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      compases: [],
      grabacionTerminada: false
    };
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
    this.setState({ grabacionTerminada: true })
  }

  agregarCompas(unCompas) {
    const compases = [...this.state.compases, unCompas];
    this.setState({ compases });
  }

  dibujarCompas(unCompas, unaClave) {
    return (
      <Compas key={unaClave}>
        {unCompas.map((nota, i) => <Nota key={i} altura={nota.pitch} duracion={nota.duration} ligada={nota.has_tie}
          puntillo={nota.has_dot} />)}
      </Compas>
    );
  }

  render() {
    return (
      <Layout>
        <div id="contenedor">
          <div id="partituras">
            <Partitura metro='4/4' compases={this.state.compases}>
              {this.state.compases.map((compas, i) => this.dibujarCompas(compas, i))}
            </Partitura>
          </div>
          <BotonKazoo icono={this.state.grabacionTerminada ? 'apps' : 'stop' } 
                      onClick={ this.state.grabacionTerminada ? null : this.terminarGrabacion.bind(this)}>
              <AccionBotonKazoo onClick={() => Router.push('/pulso')}><Icon>delete</Icon></AccionBotonKazoo>
              <AccionBotonKazoo><Icon>save_alt</Icon></AccionBotonKazoo>
              <AccionBotonKazoo><Icon>edit</Icon></AccionBotonKazoo>
          </BotonKazoo>
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
      </Layout>
    );
  }
}

export default withRouter(PaginaDeGrabacion);
