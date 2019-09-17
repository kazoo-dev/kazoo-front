import {useContext} from "react";
import {AuthContext} from '../../model/Auth'
import {NavbarNoAutenticado} from "./NavbarNoAutenticado";
import {NavbarAutenticado} from "./NavbarAutenticado";

export const Navbar = () => {
  const auth = useContext(AuthContext)
  return auth ?  <NavbarAutenticado/> : <NavbarNoAutenticado/>
}
