export function registrarUsuario(informacionDeRegistro) {
    return axios.post('http://localhost:8080/usuario/registrar', {informacionDeRegistro});
}