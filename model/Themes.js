import { createMuiTheme, colors } from '@material-ui/core'

export const createColorTheme = main => createMuiTheme({ palette: { primary: { main } } })
export const Themes = {
  primary: createMuiTheme({
    palette: {
      primary: { main :'#5CDB94' },
      secondary: { main: '#05396B' },
      background: { main: '#8DE4AF' },
      error: { main: '#DC143C' },
    },
  }),
  red: createColorTheme('#DC143C'),
  orange: createColorTheme('#FF7F50'),
  sand: createColorTheme('#EDF5E0'),
  ligthGreen: createColorTheme('#8DE4AF'),
  green: createColorTheme('#5CDB94'),
  darkGreen: createColorTheme('#389583'),
  blue: createColorTheme('#05396B'),
}
export const Colors = {
  ...colors,
  ...Object.entries(Themes)
    .reduce((r, [k, v]) => ({ ...r, [k]: v.palette.primary }),{})
}
