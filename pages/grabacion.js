import dynamic from 'next/dynamic';
import Router from 'next/router';
import Nota from '../components/Nota';
import React from 'react';
import Grabador from '../model/Grabador';
import ServicioDeDeteccion from '../model/ServicioDeDeteccion';
import { redirigirSiNoEstaAutenticado } from '../components/Auth'
import { SelectorTonalidad } from '../components/SelectorTonalidad';
import { BotonModoGrabacion } from '../components/BotonModoGrabacion';
import { BotonModoEdicion } from '../components/BotonModoEdicion';

const Partitura = dynamic(() => import('../components/Partitura'), { ssr: false });
const Compas = dynamic(() => import('../components/Compas'), { ssr: false });

class PaginaDeGrabacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compases: [],
      metro: { numerador: 4, denominador: 4 },
      tonalidad: 'C',
      modoEdicion: false,
      edicionTonalidad: false,
      grabacionTerminada: false
    };
  }

  componentDidMount() {
    const pulso = Router.query.pulso;
    Grabador.iniciarGrabacion(4 * pulso, this.procesarCompas.bind(this));
  }

  procesarCompas(unAudio) {
    ServicioDeDeteccion.detectar(unAudio).then(this.agregarCompas.bind(this));
  }

  terminarGrabacion() {
    Grabador.terminarGrabacion();
    this.setState({ grabacionTerminada: true })
  }

  abrirSelectorTonalidad() {
    this.setState({ edicionTonalidad: true });
  }

  cerrarSelectorTonalidad() {
    this.setState({ edicionTonalidad: false });
  }

  cambiarTonalidad(nuevaTonalidad) {
    this.setState({ tonalidad: nuevaTonalidad, edicionTonalidad: false });
  }

  agregarCompas(unCompas) {
    const compases = [...this.state.compases, unCompas];
    this.setState({ compases });
  }

  pasarAModoEdicion() {
    this.setState({ modoEdicion: true });
  }

  dibujarCompas(unCompas, unaClave) {
    return (
      <Compas key={unaClave}>
        {unCompas.map((nota, i) => <Nota
          key={i} altura={nota.pitch} duracion={nota.duration}
          ligada={nota.has_tie} puntillo={nota.has_dot}/>)}
      </Compas>
    );
  }

  render() {
    const botonModoEdicion = <BotonModoEdicion
      abrirSelectorTonalidad={this.abrirSelectorTonalidad.bind(this)} />
    const botonModoGrabacion = <BotonModoGrabacion
      grabacionTerminada={this.state.grabacionTerminada}
      terminarGrabacion={this.terminarGrabacion.bind(this)}
      pasarAModoEdicion={this.pasarAModoEdicion.bind(this)} />
    return (
      <div>
        <div id="contenedor">
          <div id="partituras">
            <Partitura tonalidad={this.state.tonalidad} metro={this.state.metro} compases={this.state.compases}>
              {this.state.compases.map((compas, i) => this.dibujarCompas(compas, i))}
            </Partitura>
          </div>
          { this.state.modoEdicion ? botonModoEdicion : botonModoGrabacion }
        </div>
        {this.state.edicionTonalidad
          ? <SelectorTonalidad
              tonalidad={this.state.tonalidad}
              alCancelar={this.cerrarSelectorTonalidad.bind(this)}
              alSeleccionar={this.cambiarTonalidad.bind(this)}/>
            : null}
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
        `}</style>
      </div>
    );
  }
}

export default redirigirSiNoEstaAutenticado(PaginaDeGrabacion);
