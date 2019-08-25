import React, { Fragment } from 'react';

export default class Compas extends React.Component {
  componentDidMount() {
    const { metro, contexto, vexflow } = this.props;

    const compas = new vexflow.Stave(0, 0, 400)
      .addClef('treble')
      .addTimeSignature(metro)
      .setContext(contexto)
      .draw();

    const notas = React.Children.map(this.props.children, nota =>
      new vexflow.StaveNote({ keys: [nota.props.altura], duration: nota.props.duracion })
    );

    const melodia = new vexflow.Voice({ num_beats: 4, beat_value: 4 });
    melodia.addTickables(notas);
    new vexflow.Formatter().joinVoices([melodia]).format([melodia], 400);
    melodia.draw(contexto, compas);
  }

  render() {
    return <Fragment/>;
  }
}