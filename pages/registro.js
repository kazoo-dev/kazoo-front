import {MyButton} from "../components/MyButton";
import {Temas} from '../model/Temas'
import {Grid, Link, Typography, TextField, CssBaseline, Snackbar, SnackbarContent} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import { withStyles } from '@material-ui/core/styles/';
import Backend from '../model/Backend';

const { verde } = Temas;

const estilos = {
    error: {
        backgroundColor: "#d32f2f",
    },
    icono: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: 5,
    },
    mensaje: {
        display: 'flex',
        alignItems: 'center',
    },
};

const initialState = {
    usuario: '',
    clave: '',
    claveRepetida: '',
    registroConError: false,
};

class RegistroUsuario extends React.Component {

    constructor() {
        super();
        this.state = initialState;
    };

    actualizarUsuario(event) {
        this.setState({usuario: event.target.value});
    };

    actualizarClave(event) {
        this.setState({clave: event.target.value});
    };

    actualizarClaveRepetida(event) {
        this.setState({claveRepetida: event.target.value});
    };

    esValidaInformacionDeRegistro() {
        return (
            this.coincidenLasClaves()
        );
    };

    coincidenLasClaves() {
        return (
            this.state.clave === this.state.claveRepetida
        );
    };

    registrarUsuario(evento) {
        const informacionDeRegistro = {
            nombre: this.state.usuario,
            clave: this.state.clave,
        };

        Backend.registrarUsuario(informacionDeRegistro)
            .then(() => this.setState(initialState))
            .catch(error => {
                const detalleDelError = error.data && error.data.mensaje || 'Inténtelo nuevamente';
                const mensajeDeError = `Hubo un error en su registración. ${detalleDelError}`;
                this.setState({ registroConError: true, mensajeDeError });
            });

        evento.preventDefault();
    };

    limpiarError() {
        this.setState({ registroConError: false, mensajeDeError: '' });
    }

    render() {

        return (
            <div>
                <Header/>
                <CssBaseline />
                <div>
                    <img alt="kazoo" height="100px" src="static/img/kazoo-logo.svg"/>
                    <Typography component="h1" variant="h5">
                    Registro
                    </Typography>
                    <form onSubmit={this.registrarUsuario.bind(this)}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="usuario"
                                label="Usuario"
                                margin="normal"
                                value={this.state.usuario}
                                onChange={this.actualizarUsuario.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="clave"
                                label="Clave"
                                type="password"
                                margin="normal"
                                value={this.state.clave}
                                onChange={this.actualizarClave.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="repetirClave"
                                label="Repetir clave"
                                type="password"
                                margin="normal"
                                value={this.state.claveRepetida}
                                onChange={this.actualizarClaveRepetida.bind(this)}
                            />
                        </Grid>

                        <br />
                        {!this.coincidenLasClaves() &&
                            <p style={{ color: "red" }}>Las claves no coinciden.</p>
                        }
                        <MyButton type="submit" disabled={!this.esValidaInformacionDeRegistro()} theme={verde}>Registrarse</MyButton>

                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link href="#" variant="body2">
                                Ya tienes una cuenta? Ingresa aquí.
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Footer/>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                          open={this.state.registroConError} autoHideDuration={6000}
                          onClose={this.limpiarError.bind(this)}>
                    <SnackbarContent
                      className={this.props.classes.error}
                      aria-describedby="client-snackbar"
                      message={
                          <span id="client-snackbar" className={this.props.classes.mensaje}>
                            <ErrorIcon className={this.props.classes.icono} />
                              {this.state.mensajeDeError}
                          </span>
                      }
                    />
                </Snackbar>
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
                        `}
                </style>
            </div>
        );
      }

}

export default withStyles(estilos)(RegistroUsuario);
