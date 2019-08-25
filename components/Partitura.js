import React from 'react';

export default class Partitura extends React.Component {
  constructor(props) {
    super(props);
    this.referenciaPartitura = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    this.vexflow = require('vexflow').Flow;
    this.contexto = new this.vexflow.Renderer(this.referenciaPartitura.current, this.vexflow.Renderer.Backends.SVG).getContext();
    this.setState({ compases: this.compases() });
  }

  compases() {
    return React.Children.map(this.props.children, compas =>
      React.cloneElement(compas, { metro: this.props.metro, contexto: this.contexto, vexflow: this.vexflow })
    );
  }
  render() {
    return <div ref={this.referenciaPartitura}>
      {this.state.compases}
    </div>;
  }
};