export const EscalaCromatica = {
  alturas: ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'],
  //De 0 a 8

  obtenerIndiceAltura(unaAltura) {
    const letra = unaAltura.split('/')[0];
    if (letra === 'r') {
      throw new Error('No puedes modificar la altura de un silencio!');
    }

    const indiceAltura = this.alturas.indexOf(letra);
    if (indiceAltura === -1) {
      throw new Error('No existe esa altura!');
    }

    return indiceAltura;
  },

  siguienteAlturaPara(unaAltura) {
    const indiceAltura = this.obtenerIndiceAltura(unaAltura);
    let numero = unaAltura.split('/')[1];

    if(this.alturas[(indiceAltura % this.alturas.length)] === 'b'){
      numero++;
    }

    return this.alturas[(indiceAltura + 1) % this.alturas.length] + this.expresarNumero(numero);
  },

  anteriorAlturaPara(unaAltura) {
    const indiceAltura = this.obtenerIndiceAltura(unaAltura);
    let numero = unaAltura.split('/')[1];

    if(this.alturas[(indiceAltura % this.alturas.length)] === 'c'){
      numero--;
    }

    return this.alturas[(indiceAltura + this.alturas.length - 1) % this.alturas.length] + this.expresarNumero(numero);
  },

  expresarNumero(numero){
    return (numero > 0 ? ('/' + numero) : '')
  },
};
