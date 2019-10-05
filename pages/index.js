import Router from 'next/router';
import { Component } from 'react';
import Layout from '../components/Layout';
import { MarcadorInicioDePulso } from '../components/MarcadorInicioDePulso';

const ESTADO_INICIAL = {
  Component: MarcadorInicioDePulso,
  props: null,
}

export default class PaginaNuevaPartitura extends Component {
  state = ESTADO_INICIAL
  restartState = () => this.setState(ESTADO_INICIAL)
  componentDidMount() {
    Router.events.on('routeChangeComplete', this.restartState)
  }
  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.restartState)
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
