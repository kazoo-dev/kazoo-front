import { useState } from 'react';
import { Temas } from '../model/Temas';
import { MyButton } from './MyButton';
import { BotonGrabacion } from './BotonGrabacion';

const { rojo, naranja, verde } = Temas;

export function MarcadorDeTempo({ anteNuevoCompas }) {
  const [inicioDelTempo, setInicioDelTempo] = useState();
  const [tempo, setTempo] = useState();
  const reiniciar = () => (setInicioDelTempo(), setTempo());
  const guardarTempo = () => setTempo(Date.now() - inicioDelTempo);
  const iniciarTempo = () => setInicioDelTempo(Date.now());
  return (
    <div>
      {tempo
        ? <MyButton icon="timer_off" theme={verde} onClick={reiniciar}>REINICIAR</MyButton>
        : inicioDelTempo
          ? <MyButton icon="av_timer" theme={naranja} onClick={guardarTempo}>MARCANDO...</MyButton>
          : <MyButton icon="timer" theme={rojo} onClick={iniciarTempo}>MARCAR TIEMPO</MyButton>
      }
      <BotonGrabacion tempo={tempo} anteNuevoCompas={anteNuevoCompas}/>
    </div>
  );
}
