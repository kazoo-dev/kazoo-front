import axios from 'axios';

export default {
  url: 'http://localhost:8080',

  registrarUsuario(informacionDeRegistro) {
    return axios.post(`${this.url}/usuario/registrar`, informacionDeRegistro);
  }
};
