import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
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
    <Modal className={classes.modal} open={abierto} onClose={alCerrar}>
      <Card>
        <CardContent>
          <form onSubmit={e => {
            alGuardar(nombre)
            e.preventDefault()
          }}>
            <p>Ingresá un nombre para tu partitura</p>
            <TextField autoFocus value={nombre} onChange={(evento) => actualizarNombre(evento.target.value)}/>
          </form>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={alCerrar}>Cancelar</Button>
          <Button type="submit" disabled={!nombre} size="small" onClick={() => alGuardar(nombre)}>Guardar</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
