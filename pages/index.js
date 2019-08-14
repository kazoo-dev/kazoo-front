import Head from 'next/head'

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
      <style jsx>{`
        h1 {
          text-align: center;
        }
      `}</style>
    </>
  )
}
