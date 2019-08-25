import dynamic from 'next/dynamic'
import Nota from '../components/Nota';
import { MarcadorDeTempo } from '../components/MarcadorDeTempo';
import { Fragment } from 'react';
const Partitura = dynamic(() => import('../components/Partitura'), { ssr: false });
const Compas = dynamic(() => import('../components/Compas'), { ssr: false });

export default function Home() {
  return (
    <Fragment>
      <Partitura metro='4/4'>
        <Compas>
          <Nota altura='c/4' duracion='4'/>
          <Nota altura='d/4' duracion='4'/>
          <Nota altura='e/4' duracion='4'/>
          <Nota altura='f/4' duracion='4'/>
        </Compas>
      </Partitura>
      <MarcadorDeTempo />
    </Fragment>
  )
}
