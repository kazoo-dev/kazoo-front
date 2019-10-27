import { useState, useEffect } from 'react'
import Link from 'next/link';
import Layout from '../components/Layout';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Colores } from '../model/Temas'
import Backend from '../model/Backend'
import {MensajeDeError} from "../components/MensajeDeError";
import { ModalCompartir } from '../components/ModalCompartir';

const useStyles = makeStyles(theme => ({
  listaPartituras: {
    width: '100%',
    height: '100%',
    backgroundColor: Colores.verdeObscuro.main,
    color:  Colores.azul.main,
    fontSize: 'x-large',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  partitura: {
    backgroundColor: Colores.verdeClaro.main,
    margin: '20px',
    padding: '20px',
    width: 'auto'
  },
  accionesPartitura: {
    marginRight: '20px',
  }
}));

export default () => {
  const classes = useStyles()
  const [partituras, setPartituras] = useState()
  const [listadoConError, setListadoConError] = useState(false)
  const [mensajeDeError, setMensajeDeError] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [partituraSeleccionadaId, setPartituraSeleccionadaId] = useState()

  useEffect(() => {
    Backend.obtenerTodasLasPartiturasPara().then(setPartituras)
  }, [])

  const eliminarPartitura = (partitura) => {
    Backend.eliminarPartitura(partitura.id)
      .then(function(){
        const nuevasPartituras = [...partituras];
        nuevasPartituras.splice(nuevasPartituras.indexOf(partitura), 1);
        setPartituras(nuevasPartituras);
      })
      .catch((error) => {
        const detalleDelError = error.response.data && error.response.data.message || 'Inténtelo nuevamente más tarde.';
        const mensajeDeError = `Hubo un error al eliminar la partitura. ${detalleDelError}`;
        setListadoConError(true);
        setMensajeDeError(mensajeDeError);
      })
  }

  const limpiarError = () => {
    setListadoConError(false);
    setMensajeDeError('');
  };

  const publicarPartitura = (id) => {
    Backend.publicarPartitura(id).then(() => {
      setPartituraSeleccionadaId(id)
      setModalAbierto(true)
    })
    .catch((error) => {
      const detalleDelError = error.response.data && error.response.data.message || 'Inténtelo nuevamente más tarde.';
      const mensajeDeError = `Hubo un error al publicar la partitura. ${detalleDelError}`;
      setListadoConError(true);
      setMensajeDeError(mensajeDeError);
    })
  }

  return (
    <Layout>
      <List className={classes.listaPartituras}>
      {partituras
        ? partituras.length
          ? partituras.map(
            p => <ListItem key={p.id} className={classes.partitura}>
              {p.nombrePartitura}
              <ListItemSecondaryAction className={classes.accionesPartitura}>
                <Link href={`/partitura/${p.id}`}><IconButton><Icon>edit</Icon></IconButton></Link>
                <IconButton onClick={() => publicarPartitura(p.id)}><Icon>link</Icon></IconButton>
                <IconButton onClick={() => eliminarPartitura(p)}><Icon>delete</Icon></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ) : <div>
            Aun no tienes grabaciones guardadas, puedes grabar tu primer partitura <Link href="/"><a>aqui</a></Link>
          </div>
        : 'Cargando partituras'
      }
      </List>
      <MensajeDeError open={listadoConError}
                        vertical={"top"}
                        horizontal={"center"}
                        limpiarError={() => limpiarError()}
                        mensajeDeError={mensajeDeError} />
      <ModalCompartir abierto={modalAbierto} alCerrar={() => setModalAbierto(false)} partituraId={partituraSeleccionadaId}/>
    </Layout>
  );
}
