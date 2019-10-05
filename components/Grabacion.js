import dynamic from 'next/dynamic';
import Router from 'next/router';
import { Component, Fragment } from 'react';
import Backend from '../model/Backend';
import Grabador from '../model/Grabador';
import { detectarArchivo, detectarFragmento } from '../model/ServicioDeDeteccion';
import { BotonModoEdicion } from './BotonModoEdicion';
import { BotonModoGrabacion } from './BotonModoGrabacion';
import { ModalKazoo } from './ModalKazoo';
import { SelectorTonalidad } from './SelectorTonalidad';

const Partitura = dynamic(() => import('./Partitura'), { ssr: false });

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
    if (this.props.file) {
      detectarArchivo(this.props.file, this.props.pulso)
        .then(compases => this.setState({ compases }))
    } else {
      Grabador.iniciarGrabacion(4 * this.props.pulso, this.procesarCompas);
    }
  }

  componentWillUnmount() {
    Grabador.terminarGrabacion();
  }

  procesarCompas = (unFragmentoDeAudio) => {
    detectarFragmento(unFragmentoDeAudio).then(this.agregarCompas);
  }

  terminarGrabacion = () => {
    Grabador.terminarGrabacion();
    this.setState({ grabacionTerminada: true });
  }

  abrirSelectorTonalidad = () => {
    this.setState({ edicionTonalidad: true });
  }

  cerrarSelectorTonalidad = () => {
    this.setState({ edicionTonalidad: false });
  }

  cambiarTonalidad = (nuevaTonalidad) => {
    this.setState({ tonalidad: nuevaTonalidad, edicionTonalidad: false });
  }

  agregarCompas = (unCompas) => {
    this.setState({ compases: [...this.state.compases, unCompas] });
  }

  pasarAModoEdicion = () => {
    this.setState({ modoEdicion: true });
  }

  abrirModalGuardar = () => {
    this.setState({ modalAbierto: true });
  }

  cerrarModalGuardar = () => {
    this.setState({ modalAbierto: false });
  }

  guardarPartitura = (nombre) => {
    const { compases, tonalidad, metro } = this.state;
    const { numerador, denominador } = metro;
    Backend.guardarPartitura({ compases, tonalidad, numerador, denominador, nombre })
      .finally(() => Router.push('/'));
  }

  render() {
    return (
      <Fragment>
        <Partitura scrollea={true}
          tonalidad={this.state.tonalidad}
          metro={this.state.metro}
          compases={this.state.compases} />
        {this.state.modoEdicion
          ? <BotonModoEdicion abrirSelectorTonalidad={this.abrirSelectorTonalidad} />
          : <BotonModoGrabacion grabacionTerminada={this.state.grabacionTerminada}
            terminarGrabacion={this.terminarGrabacion}
            pasarAModoEdicion={this.pasarAModoEdicion}
            abrirModal={this.abrirModalGuardar} />
        }
        {this.state.edicionTonalidad
          && <SelectorTonalidad tonalidad={this.state.tonalidad}
            alCancelar={this.cerrarSelectorTonalidad}
            alSeleccionar={this.cambiarTonalidad} />
        }
        <ModalKazoo abierto={this.state.modalAbierto}
          alCerrar={this.cerrarModalGuardar}
          alGuardar={this.guardarPartitura} />
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
