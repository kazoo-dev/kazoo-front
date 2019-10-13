import dynamic from 'next/dynamic';
import Router from 'next/router';
import {Component, Fragment} from 'react';
import Backend from '../model/Backend';
import Grabador from '../model/Grabador';
import {detectarArchivo, detectarFragmento} from '../model/ServicioDeDeteccion';
import {BotonModoEdicion} from './BotonModoEdicion';
import {BotonModoGrabacion} from './BotonModoGrabacion';
import {ModalKazoo} from './ModalKazoo';
import {SelectorTonalidad} from './SelectorTonalidad';
import {SelectorAltura} from "./SelectorAltura";

const Partitura = dynamic(() => import('./Partitura'), { ssr: false });

export class Grabacion extends Component {
  state = {
    compases: [],
    tonalidad: 'C',
    modoEdicion: false,
    edicionTonalidad: false,
    edicionAltura: false,
    mostrarSelectorAltura: false,
    grabacionTerminada: false,
    modalAbierto: false,
    nombre:'',
    loading: true,
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({grabacionTerminada:true});
      Backend.obtenerPartitura(this.props.id)
        .then(partitura => {
          this.setState({ ...partitura, loading: false })
        })
    } else if (this.props.file) {
      this.setState({grabacionTerminada:true});
      detectarArchivo(this.props.file, this.props.pulso,this.props.metro)
        .then(compases => this.cargarPagina(compases))

    } else {
      this.setState({ loading: false })
      Grabador.iniciarGrabacion(4 * this.props.pulso, this.procesarCompas)
    }
  }

  cargarPagina(compases){
    this.setState({loading:false});
    this.setState({compases});
  }

  componentWillUnmount() {
    if (!(this.props.file || this.props.id)) {
      Grabador.terminarGrabacion()
    }
  }

  procesarCompas = (unFragmentoDeAudio) => {
    detectarFragmento(unFragmentoDeAudio, this.props.metro).then(this.agregarCompas);
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
    let notaModificada = this.state.notaSeleccionada;
    notaModificada.pitch = nuevaAltura;
    this.setState({ notaSeleccionada: notaModificada, mostrarSelectorAltura: false });
    const { compases, tonalidad, id, nombre} = this.state;
    const { numerador, denominador } = this.props.metro;
    this.modificarPartitura(compases, tonalidad, numerador, denominador, nombre, id);


  }

  modificarPartitura(compases, tonalidad, numerador, denominador, nombre, id) {
    Backend.modificarPartitura({compases, tonalidad, numerador, denominador, nombre, id})
      .finally(() => Router.push('/partitura/' + id));
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
    const { compases, tonalidad,  id } = this.state;
    const { numerador, denominador } = this.props.metro;
    Backend.guardarPartitura({ compases, tonalidad, numerador, denominador, nombre, id })
      .finally(() => Router.push('/partituras'));
  }

  handleClickNota = ({ compas, nota }) => {
    this.setState({ notaSeleccionada: nota })

    if (this.state.edicionAltura) {
      this.setState({ edicionAltura: false });
      this.abrirSelectorAltura()
    }
  }

  render() {
    return (
      <Fragment>
        <Partitura scrollea={!this.props.id} {...this.state}
                   tonalidad={this.state.tonalidad}
                   metro={this.props.metro}
                   compases={this.state.compases}
                   onClickNota={this.handleClickNota}/>
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
