export const CirculoDeQuintas = {
  tonalidades: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'],

  obtenerIndiceTonalidad(unaTonalidad) {
    const indiceTonalidad = this.tonalidades.indexOf(unaTonalidad);
    if (indiceTonalidad === -1) {
      throw new Error('No existe esa tonalidad!');
    }

    return indiceTonalidad;
  },

  siguienteTonalidadPara(unaTonalidad) {
    const indiceTonalidad = this.obtenerIndiceTonalidad(unaTonalidad);
    return this.tonalidades[(indiceTonalidad + 1) % this.tonalidades.length];
  },

  anteriorTonalidadPara(unaTonalidad) {
    const indiceTonalidad = this.obtenerIndiceTonalidad(unaTonalidad);
    return this.tonalidades[(indiceTonalidad + this.tonalidades.length - 1) % this.tonalidades.length];
  },
};
