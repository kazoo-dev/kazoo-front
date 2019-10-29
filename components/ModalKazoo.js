import Modal from '@material-ui/core/Modal';
import {useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Button, Card, CardActions, CardContent, TextField} from '@material-ui/core';

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
            <p>Ingresá un nombre para tu partitura</p>
            <TextField autoFocus value={nombre} onChange={(evento) => actualizarNombre(evento.target.value)}/>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={alCerrar}>Cancelar</Button>
          <Button type="submit" disabled={!nombre} size="small" onClick={() => alGuardar(nombre)}>Guardar</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
