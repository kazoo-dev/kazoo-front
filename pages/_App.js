import App, { Container } from 'next/app'
import Head from 'next/head'
import { withStyles, ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Temas } from '../model/Temas'

export default withStyles({
  h1: { textAlign: 'center' },
})(class MyApp extends App {
  componentDidMount() {
    const ssrStyles = document.querySelector('#jss-server-side')
    if (ssrStyles) { ssrStyles.parentNode.removeChild(ssrStyles) }
  }
  render() {
    const { Component, pageProps, classes } = this.props
    return (
      <Container>
        <Head>
          <title>Kazoo</title>
        </Head>
        <ThemeProvider theme={Temas.primario}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
})
