import { BotonKazoo } from "./BotonKazoo";
import { AccionBotonKazoo } from './AccionBotonKazoo';
import { Fragment } from "react";

export const BotonModoEdicion = ({ abrirSelectorTonalidad }) => (
    <Fragment>
        <BotonKazoo icono='edit'>
            <AccionBotonKazoo onClick={abrirSelectorTonalidad}>
                <img src="/static/img/armadura-clave.png" alt="Modificar armadura de clave"/>
            </AccionBotonKazoo>            
        </BotonKazoo>
        <style jsx>{`
            img {
                width: 100%;
            }
            `}
        </style>
    </Fragment>
)