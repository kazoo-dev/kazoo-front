export const setUsuario = nombreDeUsuario => {
    return localStorage.setItem('usuario', nombreDeUsuario);
};

export const removeUsuario = () => {
    return localStorage.removeItem('usuario');
};

export const getUsuario = () => {
    return localStorage.getItem('usuario');
};