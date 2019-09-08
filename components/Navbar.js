import Link from 'next/link';

export function Navbar() {
    return <div className="navbar">
        <img src="../static/img/kazoo.-logo-color.svg" />
        <div id="botones">
            <Link href="/ingreso">
                <a>Login</a>
            </Link>
            <Link href="/registro">
                <a>Registro</a>
            </Link>
        </div>
        <style jsx>{`
            .navbar {
                height: 60px;
                background-color: #389583;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            img {
                height: 70%;
                margin-left: 20px;
            }

            #botones {
                width: 200px;
                display: flex;
                justify-content: space-between;
                margin-right: 20px;
            }
        `}</style>
    </div>
}