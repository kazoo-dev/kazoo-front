import {Navbar} from "./NavBar/Navbar";
import {CssBaseline} from '@material-ui/core';

const Layout = props => (
    <div>
        <CssBaseline />
        <Navbar />
        {props.children}
        <style jsx> {`
            div {
                height: 100%;
                display: flex;
                flex-direction: column;
                }
            `}
        </style>
    </div>
);

export default Layout;