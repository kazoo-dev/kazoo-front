import Modal from '@material-ui/core/Modal';
import { Fragment, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, TextField, Card, CardContent, CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

export const ModalKazoo = ({ abierto, alCerrar, alGuardar }) => {
  const classes = useStyles();

  const [nombre, actualizarNombre] = useState();

  return (
    <Fragment>
      <Modal className={classes.modal} open={abierto} onClose={alCerrar}>
        <Card>
          <CardContent>
            <p>Ingresá un nombre para tu partitura</p>
            <TextField value={nombre} onChange={(evento) => actualizarNombre(evento.target.value)}/>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={alCerrar}>Cancelar</Button>
            <Button type="submit" disabled={!nombre} size="small" onClick={() => alGuardar(nombre)}>Guardar</Button>
          </CardActions>
        </Card>
      </Modal>
    </Fragment>
  );
};
