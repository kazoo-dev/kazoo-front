import axios from 'axios';

export default {
  confg: { headers: { 'Content-Type': 'multipart/form-data' } },
  urlBackend: 'https://kazoo-back.herokuapp.com/detect/',

  async detectar(unArchvoDeAudio) {
    const formData = new FormData()
    formData.append('file', unArchvoDeAudio)
    const { data } = await axios.post(this.urlBackend, formData, this.confg)
    return data
  }
};
