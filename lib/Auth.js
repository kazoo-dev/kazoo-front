import {getUsuario} from "./Sesion"
import Router from "next/router";

export const estaAutenticado = () => getUsuario();

export const redirigirSiEstaAutenticado = rutaARedireccionar => {
  if (estaAutenticado()) {
    Router.replace(rutaARedireccionar);
  }
};

export const redirigirSiNoEstaAutenticado = () => {
  if (!estaAutenticado()) {
    Router.replace("/ingreso");
  }
};