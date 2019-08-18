import moment from "moment";

class RegistroTempo extends React.Component {

    constructor() {
        super();
        this.state = {
            inicioRegistroTempo: '',
            finRegistroTempo: '',
            primerTap: false,
            tempoRegistrado: false
        }
    }

    comenzarRegistroDeTempo = () => {
        this.setState({
            primerTap: true,
            inicioRegistroTempo: moment()
        });

    }

    finalizarRegistroTempo = () => {
        this.setState({
            tempoRegistrado: true,
            finRegistroTempo: moment()
        }, () => {
            this.guardarTempo();
        });
    }
    //To-do: borrar esto, es solo para probar
    coso = () => {
        const inicio = moment(this.state.inicioRegistroTempo);
        const fin = moment(this.state.finRegistroTempo);
        const diferencia = fin.diff(inicio);

        console.log('inicio ' + moment(this.state.inicioRegistroTempo).format())
        console.log('fin ' + moment(this.state.finRegistroTempo).format())
        console.log(diferencia);
    }

    guardarTempo() {
        const tempo = this.state.finRegistroTempo - this.state.inicioRegistroTempo;
        localStorage.setItem('tempo', tempo);
    }

    render() {
        return (
            <div>
                <button disabled={this.state.tempoRegistrado}onClick={this.state.primerTap ? this.finalizarRegistroTempo : this.comenzarRegistroDeTempo}>
                    Marcar tempo
                </button>
                <button disabled={!this.state.tempoRegistrado}>Iniciar grabación</button>
                <button onClick={this.coso}>coso</button>
            </div>
        );
      }
    
}

export default RegistroTempo;