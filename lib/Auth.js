import {getUsuario} from "./Sesion"
import Router from "next/router";

export const estaAutenticado = () => getUsuario();

export const redirigirSiEstaAutenticado = () => {
  if (estaAutenticado()) {
    Router.replace("/");
  }
};

export const redirigirSiNoEstaAutenticado = () => {
  if (!estaAutenticado()) {
    Router.replace("/ingreso");
  }
};