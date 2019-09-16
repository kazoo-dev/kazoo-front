import { Component } from 'react'
import { get } from 'lodash'
import { MyButton } from '../components/MyButton'
import { Temas } from '../model/Temas'
import { CssBaseline, Grid, Link, TextField, Typography } from '@material-ui/core'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { MensajeDeError } from '../components/MensajeDeError'
import Backend from '../model/Backend'
import Router from 'next/router'
import { setUsuario, redirigirSiEstaAutenticado } from '../components/Auth'

const { verde } = Temas

const initialState = {
  usuario: '',
  clave: '',
  ingresoConError: false
}

class IngresoUsuario extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  };

  actualizarUsuario (evento) {
    this.setState({ usuario: evento.target.value })
  };

  actualizarClave (evento) {
    this.setState({ clave: evento.target.value })
  };

  ingresar (evento) {
    const informacionDeIngreso = {
      nombre: this.state.usuario,
      clave: this.state.clave
    }

    Backend.ingresarUsuario(informacionDeIngreso)
      .then(() => {
        setUsuario(this.state.usuario)
        this.setState(initialState)
        Router.push('/')
      })
      .catch(error => {
        const detalleDelError = get(error, 'data.mensaje', 'Inténtelo nuevamente más tarde.')
        const mensajeDeError = `Hubo un error al ingresar. ${detalleDelError}`
        this.setState({ ingresoConError: true, mensajeDeError })
      })

    evento.preventDefault()
  };

  limpiarError () {
    this.setState({ ingresoConError: false, mensajeDeError: '' })
  };

  render () {
    return (
      <div>
        <Header />
        <CssBaseline />
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <img alt='kazoo' height='100px' src='static/img/kazoo-logo.svg' />
          <Typography component='h1' variant='h5'>
                      Ingresar
          </Typography>
          <form onSubmit={this.ingresar.bind(this)}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='usuario'
                label='Usuario'
                margin='normal'
                value={this.state.usuario}
                onChange={this.actualizarUsuario.bind(this)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='clave'
                label='Clave'
                type='password'
                margin='normal'
                value={this.state.clave}
                onChange={this.actualizarClave.bind(this)}
              />
            </Grid>

            <MyButton type='submit' theme={verde}>Iniciar sesión</MyButton>

            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='/registro' variant='body2'>
                  No tienes una cuenta? Registráte.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Footer />
        <MensajeDeError
          open={this.state.ingresoConError}
          vertical='top'
          horizontal='center'
          limpiarError={this.limpiarError.bind(this)}
          mensajeDeError={this.state.mensajeDeError}
        />
        <style jsx> {`
          div {
            width:100%;
            height:100%;
            background-color: #EDF5E0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          form {
            display:flex;
            flex-direction: column;
            width: 50%;
          }
        `}</style>
      </div>
    )
  }
}

export default redirigirSiEstaAutenticado(IngresoUsuario)
