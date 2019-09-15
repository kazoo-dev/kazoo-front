import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';

export class BotonKazoo extends Component {
  constructor(props) {
    super(props);
    this.state = { clickeado: false };
  }

  alternarEstado() {
    this.setState({ clickeado: !this.state.clickeado });
  }

  renderizarAcciones() {
    return React.Children.map(this.props.children, (accion, indice) =>
      React.cloneElement(accion, { clickeado: this.state.clickeado, indice: indice, total: this.props.children.length || 1}))
  }

  render() {
    return <div id="kazoo">
      <button id="boton" onClick={ this.props.onClick || this.alternarEstado.bind(this)}>
        <span id="icon">
          <Icon>{ this.state.clickeado ? 'clear' : this.props.icono }</Icon>
        </span>
        { this.renderizarAcciones() }
      </button>
      <style jsx>{`
      #kazoo {
        display: flex;
        position: relative;
        justify-content: center;
        height: 36px;
        background-color: #5CDB94;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        animation: slide-in 1s;
      }
      
      #boton {
        position: relative;
        border-radius: 50%;
        border: none;
        top: -40px;
        width: 75px;
        height: 75px;
        background-color: white;
        background-image: url(/static/img/kazoo-icon.svg);
        transform: scale(1.3);
      }
      
      #icon {
        width: 20px;
        height: 20px;
        position: absolute;
        margin: auto;
        top: -3px;
        left: -3px;
        bottom: 0;
        right: 0;
        background-color: #5CDB94;
        border-radius: 50%;
      }
    `}</style>
    </div>;
  }
}
