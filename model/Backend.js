import axios from 'axios';
import {getUsuario} from '../lib/Sesion';

export default {
  url: process.env.API_BACK,

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

  modificarPartitura(unaPartitura) {
    return axios.put(`${this.url}/partitura`, this.serializarParitura(unaPartitura), this.headerNombreDeUsuario());
  },

  eliminarPartitura(unId) {
    return axios.delete(`${this.url}/partitura/${unId}`, this.headerNombreDeUsuario());
  },

  serializarParitura(unaPartitura) {
    const compases = unaPartitura.compases.map(compas => ({
      notas: compas.map(unaNota => ({
        ...unaNota,
        duration: typeof unaNota.duration === 'string'
          ? unaNota.duration
          : unaNota.duration.join('-')
      }))
    }));
    return {
      ...unaPartitura, compases,
      partitura_id: unaPartitura.id || 0,
    };
  },

  deserializarPartitura(unaPartituraEnJson) {
    const compases = unaPartituraEnJson.compases.map(
      compas => compas.notas.map(unaNota => {
        const duration = unaNota.duration.split('-')
        return {
          ...unaNota,
          duration: duration.length === 1 ? duration[0] : duration
        }
      })
    );
    const { numerador, denominador, partitura_id } = unaPartituraEnJson
    return {
      ...unaPartituraEnJson,
      compases,
      id: partitura_id,
      metro: { numerador, denominador },
    };
  }
};
