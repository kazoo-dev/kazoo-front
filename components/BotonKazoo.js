import React, { Component } from 'react';

const radio = 50;

export class BotonKazoo extends Component {
  constructor(props) {
    super(props);
    this.state = { clickeado: false };
  }

  alternarEstado() {
    this.setState({ clickeado: !this.state.clickeado });
  }

  render() {
    return <div id="kazoo">
      <button id="boton" onClick={this.alternarEstado.bind(this)}>
        <div className={this.state.clickeado ? 'accion-1': ''} />
        <div className={this.state.clickeado ? 'accion-2': ''} />
        <div className={this.state.clickeado ? 'accion-3': ''} />
      </button>
      <style jsx>{`
      #kazoo {
        display: flex;
        position: relative;
        justify-content: center;
        height: 25px;
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
        border: 0;
        top: -25px;
        width: 50px;
        height: 50px;
        background-image: url(/static/img/kazoo-icon.svg);
        transform: scale(1.3)
      }
      
      #boton > div {
        position: absolute;
        margin:auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #5CDB94;
        transition: transform 300ms ease-out;
      }
      
      .accion-1 {
        transform: translate3d(${Math.cos(3 * Math.PI / 4) * radio}px, -${Math.sin(3 * Math.PI / 4) * radio}px, 0);
      }
      
      .accion-2 {
        transform: translate3d(${Math.cos(2 * Math.PI / 4) * radio}px, -${Math.sin(2 * Math.PI / 4) * radio}px, 0);
      }
      
      .accion-3 {
        transform: translate3d(${Math.cos(Math.PI / 4) * radio}px, -${Math.sin(Math.PI / 4) * radio}px, 0);
      }
        
      @keyframes slide-in {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
    `}</style>
    </div>;
  }
}
