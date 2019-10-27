import { StaveNote } from 'vexflow/src/stavenote'
import { StaveTie } from 'vexflow/src/stavetie'
import { Stave } from 'vexflow/src/stave'
import { Voice } from 'vexflow/src/voice'
import { Vex } from 'vexflow/src/vex'
import { esCorchea, esEnlazable, esSemi, esSilencio } from './Notas'
import { isEmpty } from 'lodash'
import { Beam } from 'vexflow/src/beam'

const notaAVexflow = (nota, duracion) => new StaveNote({
  keys: [nota.pitch === 'r' ? 'g/4' : nota.pitch],
  duration: nota.pitch === 'r' ? duracion + 'r' : duracion,
});

const pasarAVexflow = nota => {
  let ligadura;
  let notasGeneradas;

  if (nota.has_tie) {
    const [primeraNotaVexflow, segundaNotaVexflow] = nota.duration.map(duracion => notaAVexflow(nota, duracion));
    ligadura = new StaveTie({
      first_note: primeraNotaVexflow, first_indices: [0],
      last_note: segundaNotaVexflow, last_indices: [0]
    });
    notasGeneradas = [primeraNotaVexflow, segundaNotaVexflow];
  } else {
    notasGeneradas = [notaAVexflow(nota, nota.duration)];
  }

  return [notasGeneradas, ligadura];
};

export const notasAVexflow = (notasDelCompas, clickHandlers, callbackNotaClickeada) => {
  return notasDelCompas.reduce(([notas, ligaduras], nota) => {
    const [notasGeneradas, ligadurasNuevas] = pasarAVexflow(nota);
    notas.push(...notasGeneradas);
    if (ligadurasNuevas) {
      ligaduras.push(ligadurasNuevas);
    }
    notasGeneradas.forEach(nota => clickHandlers.set(Vex.Prefix(nota.attrs.id), () => callbackNotaClickeada({
      compas: notasDelCompas,
      nota
    })))
    return [notas, ligaduras]
  }, [[], []])
};

export const compasAVexflow = (posicionEnY, ancho, tonalidad, metro) => (
  new Stave(0, posicionEnY, ancho)
    .addClef('treble')
    .addKeySignature(tonalidad)
    .addTimeSignature(`${metro.numerador}/${metro.denominador}`)
);

export const melodiaAVexflow = (metro, notas) => (
  new Voice({
    num_beats: metro.numerador,
    beat_value: metro.denominador,
  }).addTickables(notas)
);

export const calcularEnlaces = (notas) => {
  return notas.reduce(([notaAnterior, enlaces, enlaceActual], nota) => {
    if (!esSilencio(nota) && ([nota, notaAnterior].every(esCorchea) || [nota, notaAnterior].every(esSemi))) {
      enlaceActual.push(nota)
    } else if (isEmpty(enlaceActual) && esEnlazable(nota)) {
      enlaceActual.push(nota)
    } else if (enlaceActual.length > 1 && esEnlazable(nota)) {
      enlaces.push(new Beam(enlaceActual))
      enlaceActual = [nota]
    } else if (enlaceActual.length > 1 && !esEnlazable(nota)) {
      enlaces.push(new Beam(enlaceActual))
    } else {
      enlaceActual = []
    }
    return [nota, enlaces, enlaceActual]
  }, [{duration: ''}, [], []])[1]
}