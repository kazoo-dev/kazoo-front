import MediaStreamRecorder from 'msr';

export default {
  async inicializarGrabador(anteCadaCompas) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new MediaStreamRecorder(stream);
    this.recorder.mimeType = 'audio/wav';
    this.recorder.ondataavailable = blob => anteCadaCompas(this.comoArchivo(blob))
  },

  async iniciarGrabacion(unaLongitudDeCompas, anteCadaCompas) {
    if (!this.recorder) {
      await this.inicializarGrabador(anteCadaCompas);
    } else {
      this.recorder.clearRecordedData();
    }
    this.recorder.start(unaLongitudDeCompas);
  },

  comoArchivo(unBlob) {
    return new File([unBlob], 'file.wav', { type: 'audio/wav' })
  },

  terminarGrabacion() {
    this.recorder.stop();
  }
};