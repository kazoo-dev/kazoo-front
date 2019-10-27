import Link from "next/link";
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

export function NavbarNoAutenticado() {
  const classes = makeStyles({});

  return (
      <div id="navbar">
        <Link href="/"><img src="../public/img/kazoo.-logo-color.svg" />
        </Link>
          <div id="botones">
        <Link href="/ingreso">
          <Button className={classes.button}>Ingresar</Button>
        </Link>
        <Link href="/registro">
          <Button className={classes.button}>Registro</Button>
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

      </div>)
}
