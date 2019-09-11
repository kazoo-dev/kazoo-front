import dynamic from 'next/dynamic';
import Nota from '../components/Nota';
import { MarcadorDeTempo } from '../components/MarcadorDeTempo';
import React from 'react';

const Partitura = dynamic(() => import('../components/Partitura'), { ssr: false });
const Compas = dynamic(() => import('../components/Compas'), { ssr: false });

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compases: [] };
  }

  alRecibirCompas(unCompas) {
    const compases = [...this.state.compases, unCompas];
    this.setState({ compases });
  }

  dibujarCompas(unCompas, unaClave) {
    return (
      <Compas key={unaClave}>
        {unCompas.map((nota, i) => <Nota key={i} altura={nota.pitch} duracion={nota.duration} ligada={nota.has_tie}
                                         puntillo={nota.has_dot}/>)}
      </Compas>
    );
  }

  render() {
    return (
      <div id="contenedor">
        <div id="partituras">
          <Partitura metro='4/4' compases={this.state.compases}>
            {this.state.compases.map((compas, i) => this.dibujarCompas(compas, i))}
          </Partitura>
        </div>
        <MarcadorDeTempo anteNuevoCompas={this.alRecibirCompas.bind(this)}/>
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
      </div>
    );
  }
}
