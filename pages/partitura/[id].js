import dynamic from 'next/dynamic';
import Router from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import Nota from '../../components/Nota';
import Backend from '../../model/Backend';

const Partitura = dynamic(() => import('../../components/Partitura'), { ssr: false });
const Compas = dynamic(() => import('../../components/Compas'), { ssr: false });

export default class PaginaDeGrabacion extends React.Component {
  state = { compases: [] }
  async componentDidMount() {
    const { numerador, denominador, ...partitura } =
      await Backend.obtenerPartitura(Router.query.id)
    this.setState({ metro: { numerador, denominador }, ...partitura })
  }

  dibujarCompas(unCompas, unaClave) {
    return (
      <Compas key={unaClave}>
        {unCompas.map((nota, i) => <Nota key={i}
          altura={nota.pitch} duracion={nota.duration}
          ligada={nota.has_tie} puntillo={nota.has_dot}/>)}
      </Compas>
    );
  }

  render() {
    console.log(this.state)
    const { tonalidad, metro, compases } = this.state
    return (
      <Layout>
        <h1>{this.state.nombre}</h1>
        <div id="contenedor">
          <div id="partituras">
            <Partitura tonalidad={tonalidad} metro={metro} compases={compases}>
              {compases.map((compas, i) => this.dibujarCompas(compas, i))}
            </Partitura>
          </div>
        </div>
        <style jsx>{`
          h1 {
            text-align: center;
            text-transform: uppercase;
          }
          #contenedor {
            height: calc(100% - 140px);
            display: flex;
            flex-direction: column;
          }
          #partituras {
            flex: 3;
            display: flex;
          }
        `}
        </style>
      </Layout>
    );
  }
}
