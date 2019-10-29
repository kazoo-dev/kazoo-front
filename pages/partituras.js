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
import { MensajeDeError } from "../components/MensajeDeError";
import { ModalCompartir } from '../components/ModalCompartir';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const smallWindow = 433
const useStyles = makeStyles(theme => ({
  listaPartituras: {
    width: '100%',
    height: '100%',
    backgroundColor: Colores.verdeObscuro.main,
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 'large',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    overflow: 'auto',
  },
  partitura: {
    backgroundColor: Colores.verdeClaro.main,
    borderRadius: '3px',
    boxShadow: `
      rgba(0, 0, 0, 0.3) 3px 5px 5px 3px,
      rgba(0, 0, 0, 0.15) 2px 6px 6px 1px,
      rgba(0, 0, 0, 0.1) 0px 8px 8px 0px
    `,
    margin: '20px',
    padding: '15px',
    width: 'auto'
  },
  mensaje: {
  },
  titulo: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: () => `calc(100% - ${window.innerWidth < smallWindow ? 25 : 135}px)`,
  },
  accionesPartitura: {
    marginRight: '5px',
  },
  menuAcciones: {
    backgroundColor: Colores.verdeClaro.main,
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
      .then(function () {
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
  const [menu, setMenu] = useState()
  return (
    <Layout>
      {menu && <Menu
        open={true}
        anchorEl={menu[0]}
        onClose={() => setMenu()}
        MenuListProps={{ className: classes.menuAcciones }}
      >
        <Link href={`/partitura/${menu[1].id}`}>
          <MenuItem><Icon>edit</Icon></MenuItem>
        </Link>
        <MenuItem onClick={() => publicarPartitura(menu[1].id)}>
          <Icon>link</Icon>
        </MenuItem>
        <MenuItem onClick={() => eliminarPartitura(menu[1])}>
          <Icon>delete</Icon>
        </MenuItem>
      </Menu>}
      <List className={classes.listaPartituras}>
        {partituras
          ? partituras.length
            ? partituras.map(
              (p, i) => <ListItem key={p.id} className={classes.partitura}>
                <div className={classes.titulo}>{`${i+1}. ${p.nombrePartitura}`}</div>
                {window.innerWidth < smallWindow ? (
                  <ListItemSecondaryAction className={classes.accionesPartitura}>
                    <IconButton onClick={e => setMenu([e.currentTarget, p])}>
                      <Icon>more_vert</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                ) : (
                  <ListItemSecondaryAction className={classes.accionesPartitura}>
                    <Link href={`/partitura/${p.id}`}><IconButton><Icon>edit</Icon></IconButton></Link>
                    <IconButton onClick={() => publicarPartitura(p.id)}><Icon>link</Icon></IconButton>
                    <IconButton onClick={() => eliminarPartitura(p)}><Icon>delete</Icon></IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ) : <div className={classes.mensaje}>
              Aun no tienes grabaciones guardadas, puedes grabar tu primer partitura <Link href="/"><a>aqui</a></Link>
            </div>
          : <div className={classes.mensaje}>Cargando partituras ...</div>
        }
      </List>
      <MensajeDeError open={listadoConError}
        vertical={"top"}
        horizontal={"center"}
        limpiarError={() => limpiarError()}
        mensajeDeError={mensajeDeError} />
      <ModalCompartir abierto={modalAbierto} alCerrar={() => setModalAbierto(false)} partituraId={partituraSeleccionadaId} />
    </Layout>
  );
}
