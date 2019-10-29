import {Onda} from './Onda';
import {LayoutPreGrabacion} from './LayoutPreGrabacion'
import {MarcadorFinalDePulso} from './MarcadorFinalDePulso'
import {MyButton} from "./MyButton";
import {Grid, TextField} from '@material-ui/core';
import {ComenzarGrabacion} from "./ComenzarGrabacion";
import { conversorPulsoBPM } from '../model/Bpm';


export class MarcadorInicioDePulso extends React.Component {

  constructor(props) {
    super(props);
    this.state = {pulso: ""}
  }

  actualizarPulso(evento) {
    this.setState({pulso: evento.target.value});
  }

  submitPulso(evento) {
    this.props.onSiguienteEstado(ComenzarGrabacion, {pulso: conversorPulsoBPM(this.state.pulso)})
  }

  render() {
    return (
      <LayoutPreGrabacion onClick={
        () => this.props.onSiguienteEstado(MarcadorFinalDePulso, {inicioDelPulso: Date.now()})}>
        <h1>Pulsá dos veces la pantalla</h1>
        <br/>
        <p>Para marcar el pulso de tu melodía</p>
        <br/>
        <Onda/>
        <p>o ingresalo acá</p>
        <form id="pulso-ingresado" onSubmit={this.submitPulso.bind(this)}>
          <Grid item xs={12}>
            <TextField
              id="input"
              margin="normal"
              value={this.state.pulso}
              onChange={this.actualizarPulso.bind(this)}
              onClick={e => e.stopPropagation()}
            />
          </Grid>
          <br/>
          <MyButton disabled={!this.state.pulso} type="submit">Ingresar</MyButton>
        </form>
        <style jsx>{`
          h1, p, form {
            color: #EDF5E0;
            text-align: center;
            margin:0;
          }
        `}</style>
      </LayoutPreGrabacion>
    )
  }
}
