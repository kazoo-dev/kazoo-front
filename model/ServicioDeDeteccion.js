import axios from 'axios';

export default {
  confg: { headers: { 'Content-Type': 'multipart/form-data' } },
  urlBackend: 'https://kazoo-back.herokuapp.com/detect/',

  detectar(unArchvoDeAudio) {
    const formData = new FormData();
    formData.append('file', unArchvoDeAudio);
    return axios.post(this.urlBackend, formData, this.confg).then(respuesta => respuesta.data);
  }
};