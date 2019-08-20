import { Button, Icon, makeStyles } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles';
import { Themes } from '../model/Themes'

const useStyles = makeStyles(theme => ({
  button: { margin: theme.spacing(1) },
  leftIcon: { marginRight: theme.spacing(1) },
  rightIcon: { marginLeft: theme.spacing(1) },
}))

export function MyButton({ theme = Themes.primary, className, icon, children, ...props }) {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Button color="primary" variant="contained" {...props}
        className={`${classes.button} ${className}`}>
          {icon && <Icon className={classes.leftIcon}>{icon}</Icon>}
          {children}
      </Button>
    </ThemeProvider>
  )
}
