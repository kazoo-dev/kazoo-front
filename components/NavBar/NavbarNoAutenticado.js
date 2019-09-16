import Link from "next/link";
import {Button} from "@material-ui/core";

export const NavbarNoAutenticado = () => (
  <div id="navbar">
    <Link href="/">
      <img src="../static/img/kazoo.-logo-color.svg" />
    </Link>
    <div id="botones">
      <Link href="/ingreso">
        <Button>Ingresar</Button>
      </Link>
      <Link href="/registro">
        <Button>Registro</Button>
      </Link>
  </div>
  <style jsx>{`
    #navbar {
      height: 60px;
      background-color: #5CDB94;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
    img {
      height: 70%;
      cursor: pointer;
    }
    #botones {
      width: 10%;
      min-width: 180px;
      display: flex;
      justify-content: space-between;
    }
  `}</style>
  </div>
)
