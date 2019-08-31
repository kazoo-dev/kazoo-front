import {registrarUsuario} from '../utils/api';
import {MyButton} from "../components/MyButton";
import { Temas } from '../model/Temas'
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
        var informacionDeRegistro = {
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
            <div style={{ textAlign: "center", position: "relative" }}>
                <h1>Registro</h1>

                <form onSubmit={this.registrarUsuario}>
                    <div>
                        <label style={{ display: "block" }} >Usuario</label>
                        <input name="usuario" value={this.state.usuario} onChange={this.actualizarUsuario} required/>
                    </div>

                    <div>
                        <label style={{ display: "block" }} >Clave</label>
                        <input name="clave" type="password" value={this.state.clave} onChange={this.actualizarClave} required/>
                    </div>

                    <div>
                        <label style={{ display: "block" }} >Repetir Clave</label>
                        <input name="claveRepetida" type="password" value={this.state.claveRepetida} onChange={this.actualizarClaveRepetida} required/>
                    </div>

                    <br />
                    {!this.coincidenLasClaves() &&
                        <p style={{ color: "red" }}>Las claves no coinciden.</p>
                    }
                    <MyButton type="submit" disabled={!this.esValidaInformacionDeRegistro()} theme={verde}>Registrarse</MyButton>
                </form>
            </div>
        );
      }

}

export default RegistroUsuario;