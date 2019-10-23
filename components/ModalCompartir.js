import Modal from '@material-ui/core/Modal';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

export const ModalCompartir = ({ abierto, alCerrar, partituraId }) => {
  const classes = useStyles();

  return (
    <Modal className={classes.modal} open={abierto} onClose={alCerrar}>
      <Card>
        <CardContent>
          <p>Copia este link y compartilo con tus amiguis!</p>
          <p>http://localhost:3000/partituras/{partituraId}</p>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={alCerrar}>OK</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
