import Icon from '@material-ui/core/Icon'

export const LinkReproduccion = ({children, icono, mostrar=true, ...props}) => (
  <div className={mostrar ? '' : 'no-mostrar'} { ...props }>
    <Icon>{icono}</Icon >
    {children}
    <style jsx>{`
      .no-mostrar {
        opacity: 0;
      }
      
      div {
        transition: opacity 1s;
        opacity: 1;
        position: fixed;
        left: 0;
        bottom: 40px;
        display: flex;
        align-items: center;
      }
    `}</style>
  </div>
)

