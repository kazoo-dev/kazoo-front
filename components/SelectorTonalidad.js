import React from 'react';
import { SelectorConBotonera } from './SelectorConBotonera';
import Icon from '@material-ui/core/Icon';
import { CirculoDeQuintas } from '../model/CirculoDeQuintas';

export class SelectorTonalidad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tonalidad: 'C' };
  }

  subirTonalidad() {
    this.setState({ tonalidad: CirculoDeQuintas.siguienteTonalidadPara(this.state.tonalidad) });
  }

  bajarTonalidad() {
    this.setState({ tonalidad: CirculoDeQuintas.anteriorTonalidadPara(this.state.tonalidad) });
  }

  render() {
    return (
      <SelectorConBotonera alSeleccionar={() => this.props.alSeleccionar(this.state.tonalidad)} alCancelar={this.props.alCancelar}>
        <span className="titulo">Modificá la tonalidad</span>
        <span className="up" onClick={this.subirTonalidad.bind(this)}><Icon>keyboard_arrow_up</Icon></span>
        <span id="tonalidad">{this.state.tonalidad}</span>
        <span className="down" onClick={this.bajarTonalidad.bind(this)}><Icon>keyboard_arrow_down</Icon></span>
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
          
          #tonalidad {
           font-size: 8rem;
          }
        `}</style>
      </SelectorConBotonera>
    );
  }
}
