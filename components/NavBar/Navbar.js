import {estaAutenticado} from "../../lib/Auth";
import {NavbarNoAutenticado} from "./NavbarNoAutenticado";
import {NavbarAutenticado} from "./NavbarAutenticado";
import React from "react";

export class Navbar extends React.Component{

  constructor(props){
    super(props);
    this.state = {estaAutenticado:false}
  }

  componentDidMount() {
    this.setState({estaAutenticado: estaAutenticado()})
  }

  render(){
        return this.state.estaAutenticado ?  <NavbarAutenticado/> : <NavbarNoAutenticado/>
  }
}