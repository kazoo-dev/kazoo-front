import Modal from '@material-ui/core/Modal';
import { Fragment, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import {Temas} from '../model/Temas';
import {MyButton} from './MyButton';

const {rojo, verde} = Temas;

const useStyles = makeStyles((theme) =>
  createStyles({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      contenedor: {
        height: '300px',
        width: '500px',
        backgroundColor: 'white',
      }
  }),
);

export const ModalKazoo = ({ abierto, alCerrar, alGuardar }) => {
    const classes = useStyles();

    const [nombre, actualizarNombre] = useState()

    return(
        <Fragment>
            <Modal className={classes.modal} open={abierto} onClose={alCerrar}>
                <div className={classes.contenedor}>
                    <p>Ingresá un nombre para tu partitura</p>
                    <TextField value={nombre} onChange={(evento) => actualizarNombre(evento.target.value)}></TextField>
                    <MyButton theme={rojo} onClick={alCerrar}>Cancelar</MyButton>
                    <MyButton type="submit" theme={verde} onClick={() => alGuardar(nombre)}>Guardar</MyButton>
                </div>
                
            </Modal>
            
        </Fragment>
    )
}