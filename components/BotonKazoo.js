import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon';
import CircularProgress from "@material-ui/core/CircularProgress";

export class BotonKazoo extends Component {
  constructor(props) {
    super(props);
    this.state = { clickeado: false};
  }

  alternarEstado() {
    this.setState({ clickeado: !this.state.clickeado });
  }

  renderizarAcciones() {
    const childrenValidos = React.Children.toArray(this.props.children).filter(Boolean);
    return childrenValidos.map((accion, indice) =>
      React.cloneElement(accion, { clickeado: this.state.clickeado, indice: indice, total: childrenValidos.length || 1}))
  }

  render() {
    return <div id="kazoo">
      {this.props.loading?
        <CircularProgress id="load" size={60} />:
          <button id="boton" onClick={ this.props.onClick || this.alternarEstado.bind(this)}>
            <span id="icon">
                <Icon>{ this.state.clickeado ? 'clear' : this.props.icono }</Icon>
            </span>
            { this.renderizarAcciones() }
          </button>}

      <style jsx>{`
      #kazoo {
        display: flex;
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
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-radius: 50%;
        border: none;
        top: -40px;
        width: 75px;
        height: 75px;
        background-color: white;
        background-image: url(/static/img/kazoo-icon.svg);
        transform: scale(1.3);
        outline: none;
      }
      
      #boton::-moz-focus-inner {
        border: none;
      }
      
      #icon {        
        width: 25px;
        height: 25px;
      }
      
      @keyframes slide-in {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
    `}</style>
    </div>;
  }
}
