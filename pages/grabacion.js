import dynamic from 'next/dynamic';
import Router from 'next/router';
import { Component } from 'react';
import Grabador from '../model/Grabador';
import ServicioDeDeteccion from '../model/ServicioDeDeteccion';
import Layout from '../components/Layout';
import { SelectorTonalidad } from '../components/SelectorTonalidad';
import { BotonModoGrabacion } from '../components/BotonModoGrabacion';
import { BotonModoEdicion } from '../components/BotonModoEdicion';
import { ModalKazoo } from '../components/ModalKazoo';
import Backend from '../model/Backend';

const Partitura = dynamic(() => import('../components/Partitura'), { ssr: false });

export default class PaginaDeGrabacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compases: [],
      metro: { numerador: 4, denominador: 4 },
      tonalidad: 'C',
      modoEdicion: false,
      edicionTonalidad: false,
      grabacionTerminada: false,
      modalAbierto: false,
    };
  }

  componentDidMount() {
    const pulso = Router.query.pulso;
    Grabador.iniciarGrabacion(4 * pulso, this.procesarCompas);
  }
  componentWillUnmount() {
    Grabador.terminarGrabacion();
  }

  procesarCompas = async (unAudio) => {
    const compas = await ServicioDeDeteccion.detectar(unAudio)
    this.agregarCompas(compas)
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
    const { tonalidad, metro, compases } = this.state
    const botonModoEdicion = <BotonModoEdicion
      abrirSelectorTonalidad={(this.abrirSelectorTonalidad)}/>;
    const botonModoGrabacion = <BotonModoGrabacion
      grabacionTerminada={this.state.grabacionTerminada}
      terminarGrabacion={this.terminarGrabacion}
      pasarAModoEdicion={this.pasarAModoEdicion}
      abrirModal={this.abrirModalGuardar}/>;
    return (
      <Layout>
        <Partitura scrollea={true} tonalidad={tonalidad} metro={metro} compases={compases}></Partitura>
        {this.state.modoEdicion ? botonModoEdicion : botonModoGrabacion}
        {this.state.edicionTonalidad
          ? <SelectorTonalidad tonalidad={tonalidad}
              alCancelar={this.cerrarSelectorTonalidad}
              alSeleccionar={this.cambiarTonalidad}/>
          : null}
        <ModalKazoo abierto={this.state.modalAbierto}
                    alCerrar={this.cerrarModalGuardar}
                    alGuardar={this.guardarPartitura}/>
      </Layout>
    );
  }
}
