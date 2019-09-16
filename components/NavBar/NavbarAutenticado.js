import Link from "next/link";
import {useContext} from "react";
import {AuthContext} from '../Auth'
import {removeUsuario} from "../Auth";
import {makeStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Router from "next/router";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export function NavbarAutenticado() {
    const classes = makeStyles({});
    const auth = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const StyledMenu = withStyles({
        paper: {
            border: '1px solid #d3d4d5',
            backgroundColor: '#EDF5E0',
        },
    })(props => (
        <Menu
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            {...props}
        />
    ));

    const StyledMenuItem = withStyles(theme => ({
        root: {
            color:'#05396B',
            '&:focus': {
                backgroundColor: theme.palette.primary.main,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,

                },
            },
        },


    }))(MenuItem);

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function logout() {
        removeUsuario();
        Router.push("/ingreso");
    }

    return (
        <div id="navbar">
            <Link href="/"><img src="../static/img/kazoo.-logo-color.svg" />
            </Link>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            ><AccountCircle />
            {auth}
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText onClick={logout} primary="Logout" />
                </StyledMenuItem>
            </StyledMenu>
            <style jsx>{`
            #customized-menu {
                color:#EDF5E0;
            }
            ListItemIcon {
                color: #05396B;
            }
            ListItemText{
                color:#05396B;
            }

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

           `}</style>

        </div>)
}
