import { Navbar } from "./Navbar";

const Layout = props => (
    <div>
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