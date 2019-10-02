import React from 'react';
import Layout from '../components/Layout';
import { MarcadorInicioDePulso } from '../components/MarcadorInicioDePulso';

export default class PaginaMarcarPulso extends React.Component {
  state = {
    Component: MarcadorInicioDePulso,
    props: null,
  }

  handleSiguienteEstado = (siguienteComponente, propsDelSiguienteEstado) => {
    this.setState({
      Component: siguienteComponente,
      props: propsDelSiguienteEstado,
    });
  }

  render() {
    const { Component, props } = this.state
    return (
      <Layout>
        <Component {...props} onSiguienteEstado={this.handleSiguienteEstado}></Component>
      </Layout>
    );
  }
};
