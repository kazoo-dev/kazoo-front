import {MyButton} from "../components/MyButton";
import { Temas } from '../model/Temas'
const { verde } = Temas
import Head from 'next/head'
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Typography, Link, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const initialState = {
    usuario: '',
    clave: '',
};

class RegistroUsuario extends React.Component {

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

        console.log(informacionDeIngreso);

        event.preventDefault();
    };

    render() {

        return (
            <Container component="main" maxWidth="xs">
                <Head>
                    <title>Kazoo</title>
                    <link rel="icon" href="static/img/kazoo-icon.svg"/>
                </Head>
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
                            <Link href="#" variant="body2">
                                No tienes una cuenta? Registráte.
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        Copyright © Kazoo {new Date().getFullYear()}.
                    </Typography>
                </Box>
            </Container>
        );
      }

}

export default RegistroUsuario;