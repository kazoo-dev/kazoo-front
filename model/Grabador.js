import MediaStreamRecorder from 'msr';

function comoArchivo(unBlob) {
  return new File([unBlob], 'file.wav', { type: 'audio/wav' })
}

export default {
  async inicializarGrabador(anteCadaCompas) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new MediaStreamRecorder(stream);
    this.recorder.mimeType = 'audio/wav';
    let anteriorBlob = Promise.resolve()
    this.recorder.ondataavailable = (blob) => {
      anteriorBlob = anteriorBlob.then(
        () => anteCadaCompas(comoArchivo(blob))
      )
    }
  },

  async iniciarGrabacion(unaLongitudDeCompas, anteCadaCompas) {
    await this.inicializarGrabador(anteCadaCompas);
    this.recorder.start(unaLongitudDeCompas);
  },

  terminarGrabacion() {
    this.recorder.stop();
  }
};
