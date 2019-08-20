import { createMuiTheme, colors } from '@material-ui/core'

export const crearTemaConColor = main => createMuiTheme({ palette: { primary: { main } } })
export const Temas = {
  primario: createMuiTheme({
    palette: {
      primary: { main :'#5CDB94' },
      secondary: { main: '#05396B' },
      background: { main: '#8DE4AF' },
      error: { main: '#DC143C' },
    },
  }),
  rojo: crearTemaConColor('#DC143C'),
  naranja: crearTemaConColor('#FF7F50'),
  arena: crearTemaConColor('#EDF5E0'),
  verdeClaro: crearTemaConColor('#8DE4AF'),
  verde: crearTemaConColor('#5CDB94'),
  verdeObscuro: crearTemaConColor('#389583'),
  azul: crearTemaConColor('#05396B'),
}
export const Colores = {
  ...colors,
  ...Object.entries(Temas)
    .reduce((r, [k, v]) => ({ ...r, [k]: v.palette.primary }),{})
}
