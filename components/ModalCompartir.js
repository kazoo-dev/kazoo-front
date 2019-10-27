import Modal from '@material-ui/core/Modal';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    card: {
      minWidth: '350px',      
      border: '3px solid #5CDB94',
      backgroundColor: '#8DE4AF',
      outline: 'none',
    },

    button: {
      color: '#2A784C',
    }
  }),
);

export const ModalCompartir = ({ abierto, alCerrar, partituraId }) => {
  const frontendUrl = process.env.URL_FRONT
  const classes = useStyles();

  return (
    <Modal className={classes.modal} open={abierto} onClose={alCerrar}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">
            Ya publicaste tu partitura!
          </Typography>
          <p>Copia este link y compartilo con tus amiguis!</p>
          <p>{frontendUrl}partitura/{partituraId}</p>
        </CardContent>
        <CardActions>
          <Button className={classes.button} size="large" onClick={alCerrar}>OK</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
