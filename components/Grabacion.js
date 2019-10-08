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
import { SelectorAltura } from './SelectorAltura';

const Partitura = dynamic(() => import('./Partitura'), { ssr: false });

export class Grabacion extends Component {
  state = {
    compases: [],
    metro: { numerador: 4, denominador: 4 },
    tonalidad: 'C',
    modoEdicion: false,
    edicionTonalidad: false,
    edicionAltura: false,
    mostrarSelectorAltura: false,
    grabacionTerminada: true,
    modalAbierto: false,
    loading: true,
  }

  componentDidMount() {
    if (this.props.id) {
      Backend.obtenerPartitura(this.props.id)
        .then(partitura => {
          this.setState({ ...partitura, loading: false })
        })
    } else if (this.props.file) {
      detectarArchivo(this.props.file, this.props.pulso)
        .then(compases => {
          this.setState({ compases, loading: false })
        })
    } else {
      this.setState({ loading: false, grabacionTerminada: false })
      Grabador.iniciarGrabacion(4 * this.props.pulso, this.procesarCompas)
    }
  }

  componentWillUnmount() {
    if (!(this.props.file || this.props.id)) {
      Grabador.terminarGrabacion()
    }
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

  abrirSelectorAltura = () => {
    this.setState({ mostrarSelectorAltura: true });
  }

  cerrarSelectorAltura = () => {
    this.setState({ mostrarSelectorAltura: false });
  }

  cambiarTonalidad = (nuevaTonalidad) => {
    this.setState({ tonalidad: nuevaTonalidad, edicionTonalidad: false });
  }

  cambiarAltura = (nuevaAltura) => {
    this.setState({ altura: nuevaAltura, mostrarSelectorAltura: false });
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
    const { compases, tonalidad, metro, id } = this.state;
    const { numerador, denominador } = metro;
    Backend.guardarPartitura({ compases, tonalidad, numerador, denominador, nombre, id })
      .finally(() => Router.push('/partituras'));
  }

  handleClickNota = ({ compas, nota }) => {
    this.setState({ notaSeleccionada: nota })

    if (this.state.edicionAltura) {
      this.setState({ edicionAltura: false })
      this.abrirSelectorAltura()
    }
  }

  render() {
    return (
      <Fragment>
        <Partitura scrollea={!this.props.id} {...this.state} onClickNota={this.handleClickNota} />
        {this.state.modoEdicion
          ? <BotonModoEdicion abrirSelectorTonalidad={this.abrirSelectorTonalidad}
            modificarAltura={() => this.setState({ edicionAltura: true })}
            onVolver={() => this.setState({ modoEdicion: false })} />
          : <BotonModoGrabacion grabacionTerminada={this.state.grabacionTerminada}
            terminarGrabacion={this.terminarGrabacion}
            pasarAModoEdicion={this.pasarAModoEdicion}
            abrirModal={this.abrirModalGuardar}
            loading={this.state.loading} />
        }
        {this.state.edicionTonalidad
          && <SelectorTonalidad tonalidad={this.state.tonalidad}
            alCancelar={this.cerrarSelectorTonalidad}
            alSeleccionar={this.cambiarTonalidad} />
        }
        {this.state.mostrarSelectorAltura
          && <SelectorAltura altura={this.state.notaSeleccionada.pitch}
            alCancelar={this.cerrarSelectorAltura}
            alSeleccionar={this.cambiarAltura} />
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
