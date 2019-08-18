import Head from 'next/head'
import RegistroTempo from './registro-tempo';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kazoo</title>
        <link rel="icon" href="static/img/kazoo.ico.jpeg"/>
      </Head>
      <h1>
        Welcome to <img height="100px" src="static/img/kazoo.ico.jpeg"/>
      </h1>
      <RegistroTempo></RegistroTempo>
      <style jsx>{`
        h1 {
          text-align: center;
        }
      `}</style>
    </>
  )
}
