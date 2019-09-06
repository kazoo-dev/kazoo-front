import { MyButton } from './MyButton';
import Grabador from '../model/Grabador';
import { Temas } from '../model/Temas';
import ServicioDeDeteccion from '../model/ServicioDeDeteccion';

const { verde, azul } = Temas;

export class BotonGrabacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grabacionEnProgreso: false };
  }

  terminarGrabacion() {
    this.setState({ grabacionEnProgreso: false });
    Grabador.terminarGrabacion();
  }

  noop() {
  }

  procesarCompas(unAudio) {
    ServicioDeDeteccion.detectar(unAudio).then(this.props.anteNuevoCompas);
  }

  iniciarGrabacion() {
    const longitudDeCompas = 4 * this.props.pulso;
    Grabador.iniciarGrabacion(longitudDeCompas, this.procesarCompas.bind(this));
    this.setState({ grabacionEnProgreso: true });
  }

  render() {
    const { grabacionEnProgreso } = this.state;
    const { pulso } = this.props;

    const icono = pulso ? grabacionEnProgreso ? 'mic_off' : 'mic' : 'mic_none';
    const tema = pulso ? grabacionEnProgreso ? azul : undefined : verde;
    const callback = pulso ? grabacionEnProgreso ? this.terminarGrabacion : this.iniciarGrabacion : this.noop;
    const mensaje = grabacionEnProgreso ? 'DETENER' : 'GRABAR AUDIO';

    return <MyButton icon={icono} theme={tema} disabled={!pulso} onClick={callback.bind(this)}>{mensaje}</MyButton>;
  }
}
