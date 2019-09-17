import axios from 'axios';
import { getUsuario } from '../lib/Sesion'

export default {
  url: 'http://localhost:8080',

  ingresarUsuario(informacionDeIngreso) {
    return axios.post(`${this.url}/usuario/login`, informacionDeIngreso);
  },

  registrarUsuario(informacionDeRegistro) {
    return axios.post(`${this.url}/usuario/registrar`, informacionDeRegistro);
  },

  headerNombreDeUsuario() {
    return { headers: { 'usuario-nombre': getUsuario() } };
  },

  obtenerPartitura(unId) {
    return axios.get(`${this.url}/partitura/${unId}`, this.headerNombreDeUsuario())
      .then(respuesta => this.deserializarPartitura(respuesta.data));
  },

  obtenerTodasLasPartiturasPara() {
    return axios.get(`${this.url}/partitura`, this.headerNombreDeUsuario())
      .then(respuesta => respuesta.data);
  },

  guardarPartitura(unaPartitura) {
    return axios.post(`${this.url}/partitura`, this.serializarParitura(unaPartitura), this.headerNombreDeUsuario());
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
