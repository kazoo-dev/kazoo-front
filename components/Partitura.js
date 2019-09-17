import React from 'react';

export default class Partitura extends React.Component {
  constructor(props) {
    super(props);
    this.referenciaPartitura = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    this.vexflow = require('vexflow').Flow;
    const divContenedorDelSvg = this.referenciaPartitura.current;
    const renderer = new this.vexflow.Renderer(divContenedorDelSvg, this.vexflow.Renderer.Backends.SVG);
    this.contexto = renderer.getContext();
    renderer.resize(divContenedorDelSvg.offsetWidth, divContenedorDelSvg.offsetHeight);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.tonalidad !== this.props.tonalidad) {
      this.contexto.clear();
    }
  }

  compases() {
    return React.Children.map(this.props.children, (compas, index) => {
      const longitudDivContenedor = this.referenciaPartitura.current.offsetWidth;
      const propsCompas = {
        x: 0,
        y: index * 100,
        longitud: longitudDivContenedor,
        metro: this.props.metro,
        tonalidad: this.props.tonalidad,
        contexto: this.contexto,
        vexflow: this.vexflow,
      };
      return React.cloneElement(compas, propsCompas);
    });
  }

  render() {
    return <div ref={this.referenciaPartitura}>
      {this.compases()}
      <style jsx>{`
        margin: 5vh 10vw;
        width: 100%;
      `}</style>
    </div>;
  }
};

