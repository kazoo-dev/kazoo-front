export const BPM = ({ pulso }) => {
  const bpm = Math.round(60 * 1000 / pulso);

  return <span>
    <img src="/static/img/negra.png" alt={`BPM=${bpm}`}/> = { bpm }
    <style jsx>{`
      span {
        display: flex;
        align-items: center;
      }
      
      img {
        height: 1.5rem;
      }
    `}
    </style>
  </span>
}
