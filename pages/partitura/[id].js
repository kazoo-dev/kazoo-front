import dynamic from 'next/dynamic';
import Router from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import Backend from '../../model/Backend';

const Partitura = dynamic(() => import('../../components/Partitura'), { ssr: false });

export default class PaginaDeGrabacion extends React.Component {
  state = { compases: [] }
  async componentDidUpdate() {
    const { id } = Router.router.query
    if (!id || id == this.state.id) return
    const partitura = await Backend.obtenerPartitura(id)
    this.setState(partitura)
  }

  render() {
    return (
      <Layout>
        <Partitura {...this.state}></Partitura>
      </Layout>
    );
  }
}
