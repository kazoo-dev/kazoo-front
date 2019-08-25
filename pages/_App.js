import App, { Container } from 'next/app'
import Head from 'next/head'
import { withStyles, ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Themes } from '../model/Themes'

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
          <link rel="icon" href="static/img/kazoo-icon.svg"/>
        </Head>
        <ThemeProvider theme={Themes.primary}>
          <CssBaseline />
          <h1 className={classes.h1}>
            Welcome to <img height="100px" src="static/img/kazoo-logo.svg"/>
          </h1>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
})
