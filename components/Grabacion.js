import dynamic from 'next/dynamic';
import Router from 'next/router';
import {Component, Fragment} from 'react';
import Backend from '../model/Backend';
import Grabador from '../model/Grabador';
import {detectarArchivo, detectarFragmento} from '../model/ServicioDeDeteccion';
import {BotonModoEdicion} from './BotonModoEdicion';
import {BotonModoGrabacion} from './BotonModoGrabacion';
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
    metro: {},
    mostrarSelectorAltura: false,
    grabacionTerminada: false,
    nombre:'',
    loading: true,
  }

  componentDidMount() {
    this.setState({nombre:this.props.nombre});
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
    if(this.props.metro){
      this.setState({metro: this.props.metro});
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
    const { metro, compases } = this.state;
    const { nombre } = this.props;
    detectarFragmento(unFragmentoDeAudio, metro, nombre, compases.length).then(this.agregarCompas);
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
    this.state.notaSeleccionada.pitch = nuevaAltura;
    this.state.notaSeleccionada.error = 0;
    this.setState({
      mostrarSelectorAltura: false,
      metro: { ...this.state.metro },
    });
  }

  async modificarPartitura(compases, tonalidad, numerador, denominador, nombre, id) {
    await Backend.modificarPartitura({compases, tonalidad, numerador, denominador, nombre, id})
    Router.push('/partitura/' + id)
  }

  agregarCompas = (unCompas) => {
    this.setState({ compases: [...this.state.compases, unCompas] });
  }

  pasarAModoEdicion = () => {
    this.setState({ modoEdicion: true });
  }

  guardarPartitura = (nombre) => {
    const { compases, tonalidad, id } = this.state;
    const { numerador, denominador } = this.state.metro;
    const esNueva = !id;

    if(esNueva){
    Backend.guardarPartitura({ compases, tonalidad, numerador, denominador, nombre, id })
      .finally(() => Router.push('/partituras'));
    }else{
      this.modificarPartitura(compases,tonalidad,numerador,denominador,nombre,id)
    }
  }

  handleClickNota = (nota) => {
    this.setState({ notaSeleccionada: nota });
    if (this.state.edicionAltura) {
      this.setState({ edicionAltura: false });
      this.abrirSelectorAltura()
    }
  }

  render() {
    // TODO: FIXEAR PULSO EN EL BACK
    return (
      <Fragment>
        <Partitura scrollea={!this.props.id}
                   pulso={this.props.pulso || this.state.pulso || 666}
                   onClickNota={this.handleClickNota}
                   {...this.state} />
        {this.state.modoEdicion
          ? <BotonModoEdicion abrirSelectorTonalidad={this.abrirSelectorTonalidad}
            modificarAltura={() => this.setState({ edicionAltura: true })}
            onVolver={() => this.setState({ modoEdicion: false })} />
          : <BotonModoGrabacion grabacionTerminada={this.state.grabacionTerminada}
            terminarGrabacion={this.terminarGrabacion}
            pasarAModoEdicion={this.pasarAModoEdicion}
            guardarPartitura={() => {this.guardarPartitura(this.state.nombre)}}

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
