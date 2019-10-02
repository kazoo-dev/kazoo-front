import dynamic from 'next/dynamic';
import Router from 'next/router';
import { Component, Fragment } from 'react';

import ServicioDeDeteccion from '../model/ServicioDeDeteccion';
import Grabador from '../model/Grabador';
import Backend from '../model/Backend';

import Nota from './Nota';
import { SelectorTonalidad } from './SelectorTonalidad';
import { BotonModoGrabacion } from './BotonModoGrabacion';
import { BotonModoEdicion } from './BotonModoEdicion';
import { ModalKazoo } from './ModalKazoo';

const Partitura = dynamic(() => import('./Partitura'), { ssr: false });
const Compas = dynamic(() => import('./Compas'), { ssr: false });

export class Grabacion extends Component {
  state = {
    compases: [],
    metro: { numerador: 4, denominador: 4 },
    tonalidad: 'C',
    modoEdicion: false,
    edicionTonalidad: false,
    grabacionTerminada: false,
    modalAbierto: false,
  }

  componentDidMount() {
    console.log({ file: this.props.file })
    if (!this.props.file) {
      Grabador.iniciarGrabacion(4 * this.props.pulso, this.procesarCompas.bind(this));
    }
  }

  procesarCompas(unAudio) {
    ServicioDeDeteccion.detectar(unAudio).then(this.agregarCompas.bind(this));
  }

  terminarGrabacion() {
    Grabador.terminarGrabacion();
    this.setState({ grabacionTerminada: true });
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

  abrirModalGuardar() {
    this.setState({ modalAbierto: true });
  }

  cerrarModalGuardar() {
    this.setState({ modalAbierto: false });
  }

  guardarPartitura(nombre) {
    const { compases, tonalidad, metro } = this.state;
    const { numerador, denominador } = metro;
    Backend.guardarPartitura({ compases, tonalidad, numerador, denominador, nombre })
      .finally(() => Router.push('/'));
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
      <Fragment>
        <div id="contenedor">
          <div id="partituras">
            <Partitura tonalidad={this.state.tonalidad} metro={this.state.metro} compases={this.state.compases}>
              {this.state.compases.map((compas, i) => this.dibujarCompas(compas, i))}
            </Partitura>
          </div>
          {this.state.modoEdicion
            ? <BotonModoEdicion abrirSelectorTonalidad={this.abrirSelectorTonalidad.bind(this)}/>
            : <BotonModoGrabacion grabacionTerminada={this.state.grabacionTerminada}
                terminarGrabacion={this.terminarGrabacion.bind(this)}
                pasarAModoEdicion={this.pasarAModoEdicion.bind(this)}
                abrirModal={this.abrirModalGuardar.bind(this)}/>
          }
        </div>
        {this.state.edicionTonalidad
          && <SelectorTonalidad tonalidad={this.state.tonalidad}
                alCancelar={this.cerrarSelectorTonalidad.bind(this)}
                alSeleccionar={this.cambiarTonalidad.bind(this)}/>
        }
        <ModalKazoo abierto={this.state.modalAbierto}
                    alCerrar={this.cerrarModalGuardar.bind(this)}
                    alGuardar={this.guardarPartitura.bind(this)}/>
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
      </Fragment>
    );
  }
}
