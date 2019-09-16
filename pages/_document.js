import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import CssBaseline from '@material-ui/core/CssBaseline'
import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets';
import { Colores } from '../model/Temas';

export default class MyDocument extends Document {
  static getInitialProps = async ctx => {
    const sheets = new ServerStyleSheets();
    const _renderPage = ctx.renderPage;
    ctx.renderPage = () => _renderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {sheets.getStyleElement()}
        </React.Fragment>,
      ],
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8"/>
          <meta name="theme-color" content={Colores.primario.main}/>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <link rel="shortcut icon" type="image/x-icon" href="static/img/favicon.ico" />
        </Head>
        <style jsx global>{`
          html, body, #__next {
            font-family: 'Roboto', sans-serif;
            height: 100%;
          }
        `}</style>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}
