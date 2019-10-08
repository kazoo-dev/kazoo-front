import React from 'react';
import { SelectorConBotonera } from './SelectorConBotonera';
import Icon from '@material-ui/core/Icon';
import { EscalaCromatica } from '../model/EscalaCromatica';

export class SelectorAltura extends React.Component {
  constructor(props) {
    super(props);
    this.state = { altura: props.altura || 'c' };
  }

  subirAltura() {
    this.setState({ altura: EscalaCromatica.siguienteAlturaPara(this.state.altura) });
  }

  bajarAltura() {
    this.setState({ altura: EscalaCromatica.anteriorAlturaPara(this.state.altura) });
  }

  render() {
    return (
      <SelectorConBotonera alSeleccionar={() => this.props.alSeleccionar(this.state.altura)} alCancelar={this.props.alCancelar}>
        <span className="titulo">Modificá la altura</span>
        <span className="up" onClick={this.subirAltura.bind(this)}><Icon>keyboard_arrow_up</Icon></span>
        <span id="altura">{this.state.altura}</span>
        <span className="down" onClick={this.bajarAltura.bind(this)}><Icon>keyboard_arrow_down</Icon></span>
        <style jsx>{`
          .titulo {
            font-size: 2rem;
            margin-bottom: 5vh;
          }

          .up {
            margin-bottom: -25px;
            z-index: 11;
          }

          .down {
            margin-top: -25px;
            z-index: 11;
          }

          #altura {
           font-size: 8rem;
          }
        `}</style>
      </SelectorConBotonera>
    );
  }
}
