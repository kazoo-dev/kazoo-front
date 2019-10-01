import {BPM} from './BPM';
import Link from 'next/link';
import {MyButton} from './MyButton';
import DropzoneDialogCustom from "./Dropzone/DropzoneDialogCustom";
import * as PropTypes from "prop-types";
import {Component} from "react";
import Router from 'next/router';


export class ComenzarGrabacion extends Component {

  state = {file: []};

  handleSave = (file) => {
    this.setState({file: file});
    Router.push({
      pathname: '/grabacion2',
      query: {pulso: this.props.pulso}},
    );
  }

  render() {
    const {pulso, reiniciarPulso} = this.props;
    return (
      <div id="contenedor">
        <h1>Ya podés empezar la grabación de tu m"elodía!</h1>
        <BPM style={{height: '1.5rem'}} pulso={pulso}/>
        <div id="botonera">
          <MyButton icon="timer_off" onClick={reiniciarPulso}>Reiniciar</MyButton>
          <Link href={`/record?pulso=${pulso}`} as="/grabacion">
            <MyButton icon='mic'>Grabar</MyButton>
          </Link>
          <DropzoneDialogCustom onSave={this.handleSave}/>

        </div>
        <style jsx>{`
      #contenedor {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      #botonera {
        display: flex;
      }
      
      p {
        font-size: 1.5rem;
      }
      
      h1 {
        color: #EDF5E0;
        text-align: center;
      }
    `}
        </style>
      </div>
    );
  }
}

ComenzarGrabacion.propTypes = {
  pulso: PropTypes.any,
  reiniciarPulso: PropTypes.any
}
