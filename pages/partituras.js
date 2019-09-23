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

export default (props) => {
  const classes = useStyles()
  const [partituras, setPartituras] = useState()
  useEffect(() => {
    Backend.obtenerTodasLasPartiturasPara().then(setPartituras)
  }, [])

  return (
    <Layout>
      <List className={classes.listaPartituras}>
      {partituras
        ? partituras.map(
            p => <ListItem key={p.id} className={classes.partitura}>
              {p.nombrePartitura}
              <ListItemSecondaryAction className={classes.accionesPartitura}>
                <Link href={`/partitura/${p.id}`}><IconButton><Icon>edit</Icon></IconButton></Link>
                <IconButton><Icon>link</Icon></IconButton>
                <IconButton><Icon>delete</Icon></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
        ) : 'Cargando partituras'
      }
      </List>
    </Layout>
  );
}
