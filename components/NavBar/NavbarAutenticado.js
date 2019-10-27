import { Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/core/styles/withStyles";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from "next/link";
import { getUsuario, removeUsuario } from "../../lib/Sesion";

export function NavbarAutenticado() {
  const classes = makeStyles({});
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
      color: '#05396B',
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

  return (
    <div id="navbar">
      <Link href="/"><img src="../public/img/kazoo.-logo-color.svg" /></Link>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      ><AccountCircle />
        {getUsuario()}
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
            <Icon>queue_music</Icon>
          </ListItemIcon>
          <Link href="/partituras">
            <ListItemText primary="Mis partituras" />
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <Icon>music_video</Icon>
          </ListItemIcon>
          <Link href="/" >
            <ListItemText primary="Nueva partitura" />
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Link href="/ingreso">
            <ListItemText onClick={() => removeUsuario()} primary="Logout" />
          </Link>
        </StyledMenuItem>
      </StyledMenu>
      <style jsx>{`
          #navbar {
              height: 60px;
              background-color: #5CDB94;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 20px;
          }
          #customized-menu {
              color:#EDF5E0;
          }
          ListItemIcon {
              color: #05396B;
          }
          ListItemText{
              color:#05396B;
          }
          h1 {
            text-align: center;
            text-transform: uppercase;
          }
          img {
              height: 70%;
              cursor: pointer;
          }
      `}</style>
    </div>
  )
}
