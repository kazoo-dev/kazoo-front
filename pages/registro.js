import {MyButton} from "../components/MyButton";
import {Temas} from '../model/Temas'
import {CssBaseline, Grid, Link, TextField, Typography} from '@material-ui/core';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {MensajeDeError} from "../components/MensajeDeError";
import Backend from '../model/Backend';
import Layout from "../components/Layout";
import Router from 'next/router';

const { verde } = Temas;

const initialState = {
    usuario: '',
    clave: '',
    claveRepetida: '',
    registroConError: false,
};

class RegistroUsuario extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    };

    actualizarUsuario(event) {
        this.setState({ usuario: event.target.value });
    };

    actualizarClave(event) {
        this.setState({ clave: event.target.value });
    };

    actualizarClaveRepetida(event) {
        this.setState({ claveRepetida: event.target.value });
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
            .then(() => {
                this.setState(initialState);
                Router.push('/ingreso')
            })
            .catch(error => {
                const detalleDelError = error.data && error.data.mensaje || 'Inténtelo nuevamente más tarde.';
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
            <Layout>
                <div>
                    <Header />
                    <CssBaseline />
                    <div>
                        <img alt="kazoo" height="100px" src="public/img/kazoo-logo.svg" />
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
                                    <Link href="/ingreso" variant="body2">
                                        Ya tienes una cuenta? Ingresa aquí.
                            </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Footer />
                    <MensajeDeError open={this.state.registroConError}
                        vertical={"top"}
                        horizontal={"center"}
                        limpiarError={this.limpiarError.bind(this)}
                        mensajeDeError={this.state.mensajeDeError} />
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
            </Layout>
        );
    }

}

export default RegistroUsuario;
