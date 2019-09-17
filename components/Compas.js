import React, { Fragment } from 'react';

export default class Compas extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tonalidad !== this.props.tonalidad) {
      this.dibujarCompas();
    }
  }

  componentDidMount() {
    this.dibujarCompas();
  }

  dibujarCompas() {
    const { metro, tonalidad, contexto, vexflow, x, y, longitud } = this.props;

    const compas = new vexflow.Stave(x, y, longitud)
      .addClef('treble')
      .addKeySignature(tonalidad)
      .addTimeSignature(`${metro.numerador}/${metro.denominador}`)
      .setContext(contexto)
      .draw();

    let notas = [];
    let ligaduras = [];
    React.Children.forEach(this.props.children, nota => {
      // Estas dos cosas se tiene que solucionar desde el back
      const altura = nota.props.altura === 'r' ? 'g/4' : nota.props.altura;

      if (nota.props.ligada) {
        const [duracionUno, duracionDos] = nota.props.duracion;
        const nota1 = new vexflow.StaveNote({ keys: [altura], duration: this.comoSilencio(nota.props.altura, duracionUno) });
        const nota2 = new vexflow.StaveNote({ keys: [altura], duration: this.comoSilencio(nota.props.altura, duracionDos) });
        ligaduras.push(new vexflow.StaveTie({ first_note: nota1, last_note: nota2, first_indices: [0], last_indices: [0]}));
        notas.push(nota1);
        notas.push(nota2);
      } else {
        notas.push(new vexflow.StaveNote({ keys: [altura], duration: this.comoSilencio(nota.props.altura, nota.props.duracion) }));
      }
    });

    const melodia = new vexflow.Voice({ num_beats: metro.numerador, beat_value: metro.denominador });
    melodia.addTickables(notas);
    vexflow.Accidental.applyAccidentals([melodia], tonalidad);
    new vexflow.Formatter().joinVoices([melodia]).format([melodia], longitud);
    melodia.draw(contexto, compas);
    ligaduras.forEach(ligadura => ligadura.setContext(contexto).draw());
  }

  comoSilencio(altura, duracion) {
    return altura === 'r' ? duracion + 'r' : duracion;
  }

  render() {
    return <Fragment/>;
  }
}
