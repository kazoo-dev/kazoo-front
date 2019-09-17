import App, { Container } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { Temas, Colores } from '../model/Temas'
import { AuthContext, getAuth } from '../model/Auth'
import { Navbar } from '../components/NavBar/Navbar'
import { basename } from 'upath'

export default class MyApp extends App {
  static getInitialProps = props => ({
    auth: getAuth(props.ctx),
    ...super.getInitialProps(props),
  })
  componentDidMount() {
    const ssrStyles = document.querySelector('#jss-server-side')
    if (ssrStyles) { ssrStyles.parentNode.removeChild(ssrStyles) }
  }
  render() {
    const { Component, pageProps, auth } = this.props
    return (
      <Container>
        <Head>
          <title>Kazoo</title>
        </Head>
        <AuthContext.Provider value={auth}>
          <ThemeProvider theme={Temas.primario}>
            <Navbar />
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthContext.Provider>
      </Container>
    )
  }
}
