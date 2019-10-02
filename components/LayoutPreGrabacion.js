
export function LayoutPreGrabacion({ children, onClick }) {
  return (
    <div id="pulso" onClick={onClick}>
      {children}
      <style jsx> {`
        #pulso {
          height: 100%;
          background-color: #389583;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}
      </style>
    </div>
  )
}
