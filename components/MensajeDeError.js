import { Snackbar, SnackbarContent, makeStyles } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
    error: { backgroundColor: "#d32f2f" },
    icono: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: 5,
    },
    mensaje: {
        display: 'flex',
        alignItems: 'center',
    },
}))

export function MensajeDeError({ className, open, vertical, horizontal, limpiarError, mensajeDeError, ...props }) {
  const classes = useStyles()

  return (
    <Snackbar anchorOrigin={{ vertical: vertical, horizontal: horizontal, }}
        open={open} autoHideDuration={6000}
        onClose={limpiarError}>
        <SnackbarContent
            className={classes.error}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.mensaje}>
                <ErrorIcon className={classes.icono} />
                    {mensajeDeError}
                </span>
            }
        />
    </Snackbar>
  )
}
