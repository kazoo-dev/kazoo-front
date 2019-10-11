import Icon from '@material-ui/core/Icon';
import { Component } from 'react';

export class SelectorMetro extends Component {
  constructor(props) {
    super(props);
    this.state = { numerador: props.metro.numerador, denominador: props.metro.denominador };
  }

  aumentarDenominador() {
    this.setState({ denominador: this.state.denominador + 1 });
  }

  disminuirDenominador() {
    this.setState({ denominador: Math.max(1, this.state.denominador - 1) });
  }

  aumentarNumerador() {
    this.setState({ numerador: Math.min(this.state.denominador, this.state.numerador + 1) });
  }

  disminuirNumerador() {
    this.setState({ numerador: Math.max(1, this.state.numerador - 1) });
  }

  render() {
    return <div id="selector-metro">
      <span className="titulo">Modificá el metro</span>
      <span className="up" onClick={this.aumentarNumerador.bind(this)}><Icon>keyboard_arrow_up</Icon></span>
      <span className="numero">{this.state.numerador}</span>
      <span className="down" onClick={this.disminuirNumerador.bind(this)}><Icon>keyboard_arrow_down</Icon></span>
      <span id="espaciador"/>
      <span className="up" onClick={this.aumentarDenominador.bind(this)}><Icon>keyboard_arrow_up</Icon></span>
      <span className="numero">{this.state.denominador}</span>
      <span className="down" onClick={this.disminuirDenominador.bind(this)}><Icon>keyboard_arrow_down</Icon></span>
      <div id="botonera">
        <Icon fontSize="large" onClick={() => this.props.alSeleccionar({
          numerador: this.state.numerador,
          denominador: this.state.denominador
        })}>done</Icon>
        <Icon fontSize="large" onClick={this.props.alCancelar}>clear</Icon>
      </div>
      <style jsx>{`
      #selector-metro {
        color: white;
        background-color: rgb(0, 0, 0, 0.8);
        height: 100vh;
        width: 100vw;
        z-index: 10;
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        top: 0;
      }
      
      .numero {
        font-size: 8rem;
      }
      
      .titulo {
        font-size: 2rem;
        margin-bottom: 5vh;
      }
      
      #espaciador {
        width: 25%;
        border-bottom: solid white 1px;
        margin-bottom: 2.5vh;
        margin-top: 2vh;
      }
      
      .up {
        margin-bottom: -25px;
        z-index: 11;
      }
      
      .down {
        margin-top: -25px;
        z-index: 11;
      }
      
      #botonera {
        height: 7vw;
        display: flex;
        justify-content: space-between;
        width: 50%;
        margin-top: 5vh;
      }
      
       @media only screen and (max-width: 767px) {
        #selector-metro {
          background-color: rgb(0, 0, 0, 0.9);
        }
      }
    `}</style>
    </div>;
  }
}
