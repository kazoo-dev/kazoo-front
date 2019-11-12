import Modal from '@material-ui/core/Modal';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import QRCode from'qrcode.react';

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
    },
    qrcode: {
      marginTop: '20px',
      textAlign: 'center',
    }
  }),
);

export const ModalCompartir = ({ abierto, alCerrar, partituraId }) => {
  const frontendUrl = process.env.URL_FRONT
  const classes = useStyles();
  const urlPartitura = "https://kazoo-music.herokuapp.com/partitura/" + partituraId;

  return (
    <Modal className={classes.modal} open={abierto} onClose={alCerrar}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">
            Ya publicaste tu partitura!
          </Typography>
          <p>Copia este link y compartilo!</p>
          <a href={urlPartitura} >{urlPartitura}</a>
          <div className={classes.qrcode}>
            <QRCode value={urlPartitura} />
          </div>
        </CardContent>
        <CardActions>
          <Button className={classes.button} size="large" onClick={alCerrar}>OK</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
