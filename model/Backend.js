import axios from 'axios';

export default {
  url: 'http://localhost:8080',

  ingresarUsuario(informacionDeIngreso) {
    return axios.post(`${this.url}/usuario/login`, informacionDeIngreso);
  },

  registrarUsuario(informacionDeRegistro) {
    return axios.post(`${this.url}/usuario/registrar`, informacionDeRegistro);
  },

  headerNombreDeUsuario(unNombreDeUsuario) {
    return { headers: { 'usuario-nombre': unNombreDeUsuario } };
  },

  obtenerPartitura(unId, unNombreDeUsuario) {
    return axios.get(`${this.url}/partitura/${unId}`, this.headerNombreDeUsuario(unNombreDeUsuario))
      .then(respuesta => this.deserializarPartitura(respuesta.data));
  },

  obtenerTodasLasPartiturasPara(unNombreDeUsuario) {
    return axios.get(`${this.url}/partitura`, this.headerNombreDeUsuario(unNombreDeUsuario))
      .then(respuesta => respuesta.data);
  },

  guardarPartitura(unaPartitura, unNombreDeUsuario) {
    return axios.post(`${this.url}/partitura`, this.serializarParitura(unaPartitura), this.headerNombreDeUsuario(unNombreDeUsuario));
  },

  serializarDuracion(unaNota) {
    return {
      ...unaNota,
      duration: typeof unaNota.duration === 'string' ? unaNota.duration : unaNota.duration.join('-')
    };
  },

  deserializarDuracion(unaNota) {
    return {
      ...unaNota,
      duration: unaNota.duration.split('-')
    }
  },

  serializarParitura(unaPartitura) {
    const compases = unaPartitura.compases.map(compas => ({
      notas: compas.map(this.serializarDuracion.bind(this))
    }));
    return { ...unaPartitura, compases };
  },

  deserializarPartitura(unaPartituraEnJson) {
    const compases = unaPartituraEnJson.compases.map(compas => compas.notas.map(this.deserializarDuracion));
    return { ...unaPartituraEnJson, compases };
  }
};
