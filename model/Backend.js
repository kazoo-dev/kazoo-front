import axios from 'axios';

export default {
  url: 'http://localhost:8080',

  ingresarUsuario(informacionDeIngreso) {
    return axios.post(`${this.url}/usuario/login`, informacionDeIngreso);
  },

  registrarUsuario(informacionDeRegistro) {
    return axios.post(`${this.url}/usuario/registrar`, informacionDeRegistro);
  },

  guardarPartitura(partitura) {
    return axios.post(`${this.url}/partitura`, partitura);
  }
};
