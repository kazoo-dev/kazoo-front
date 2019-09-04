import axios from "axios";

export function registrarUsuario(informacionDeRegistro) {
    return axios.post('http://localhost:8080/usuario/registrar', informacionDeRegistro);
}

export function ingresarUsuario(informacionDeIngreso) {
    return axios.post('http://localhost:8080/usuario/login', informacionDeIngreso);
}
