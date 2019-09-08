import Link from 'next/link';

export function Navbar() {
    return <div id="navbar">
        <Link href="/pulso"><img src="../static/img/kazoo.-logo-color.svg" /></Link>
        <div id="botones">
            <Link href="/ingreso">
                <a>Login</a>
            </Link>
            <Link href="/registro">
                <a>Registro</a>
            </Link>
        </div>
        <style jsx>{`
            #navbar {
                height: 60px;
                background-color: #389583;
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
                width: 200px;
                display: flex;
                justify-content: space-between;
            }
        `}</style>
    </div>
}