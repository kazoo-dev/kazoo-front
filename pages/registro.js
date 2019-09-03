import {registrarUsuario} from '../utils/api';
import {MyButton} from "../components/MyButton";
import {Temas} from '../model/Temas'
import TextField from '@material-ui/core/TextField';
import {Grid, Link, Typography} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";

const { verde } = Temas

const initialState = {
    usuario: '',
    clave: '',
    claveRepetida: ''
};

class RegistroUsuario extends React.Component {

    constructor() {
        super();
        this.state = initialState;

        this.actualizarUsuario = this.actualizarUsuario.bind(this);
        this.actualizarClave = this.actualizarClave.bind(this);
        this.actualizarClaveRepetida = this.actualizarClaveRepetida.bind(this);
        this.registrarUsuario = this.registrarUsuario.bind(this);
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
            this.state.clave == this.state.claveRepetida
        );
    };

    registrarUsuario() {
        const informacionDeRegistro = {
            nombre: this.state.usuario,
            clave: this.state.clave,
        }

        registrarUsuario(informacionDeRegistro)
            .then(res => {
                console.log(res);
                console.log(res.data);

                this.setState(initialState);
            });
        event.preventDefault();
    };

    render() {

        return (
            <div>
                <Header/>
                <CssBaseline />
                <div>
                    <img height="100px" src="static/img/kazoo-logo.svg"/>
                    <Typography component="h1" variant="h5">
                    Registro
                    </Typography>
                    <form onSubmit={this.registrarUsuario}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="usuario"
                                label="Usuario"
                                margin="normal"
                                value={this.state.usuario}
                                onChange={this.actualizarUsuario}
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
                                onChange={this.actualizarClave}
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
                                onChange={this.actualizarClaveRepetida}
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
                        `}
                </style>
            </div>
        );
      }

}

export default RegistroUsuario;