import Icon from '@material-ui/core/Icon';

export const SelectorConBotonera = ({ alSeleccionar, alCancelar, children }) => (
  <div id="selector">
    {children}
    <div id="botonera">
      <Icon fontSize="large" onClick={alSeleccionar}>done</Icon>
      <Icon fontSize="large" onClick={alCancelar}>clear</Icon>
    </div>
    <style jsx>{`
      #selector {
        color: white;
        background-color: rgb(0, 0, 0, 0.8);
        height: 100vh;
        width: 100vw;
        z-index: 10;
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      
      #botonera {
        height: 7vw;
        display: flex;
        justify-content: space-between;
        width: 50%;
        margin-top: 5vh;
      }
    `}</style>
  </div>
);
