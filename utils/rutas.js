import {Route, Switch} from 'react-router-dom';
import RegistroUsuario from "../pages/registro-usuario";

export const Rutas = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/registrar" component={RegistroUsuario}/>
      </Switch>
    </div>
  )
}