import {MyButton} from "../components/MyButton";
import {Temas} from '../model/Temas'
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Link } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import { ingresarUsuario } from "../utils/api";
import Router from 'next/router';

const { verde } = Temas

const initialState = {
    usuario: '',
    clave: '',
};

class IngresoUsuario extends React.Component {

    constructor() {
        super();
        this.state = initialState;

        this.actualizarUsuario = this.actualizarUsuario.bind(this);
        this.actualizarClave = this.actualizarClave.bind(this);
        this.ingresar = this.ingresar.bind(this);
    };

    actualizarUsuario(event) {
        this.setState({usuario: event.target.value});
    };

    actualizarClave(event) {
        this.setState({clave: event.target.value});
    };

    ingresar() {

        const informacionDeIngreso = {
            nombre: this.state.usuario,
            clave: this.state.clave,
        }

        ingresarUsuario(informacionDeIngreso)
        .then(res => {
            this.setState(initialState);
            Router.push('/beat')
        });

        event.preventDefault();
    };

    render() {

        return (
            <div>
                <Header/>
                <CssBaseline />
                <div style={{ textAlign: "center", position: "relative" }}>
                    <img height="100px" src="static/img/kazoo-logo.svg"/>
                    <Typography component="h1" variant="h5">
                    Ingresar
                    </Typography>
                    <form onSubmit={this.ingresar}>
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

                        <MyButton type="submit" theme={verde}>Iniciar sesión</MyButton>

                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link href="/registro" variant="body2">
                                No tienes una cuenta? Registráte.
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

export default IngresoUsuario;