export const Onda = () =>
  <div className="onda">
    <div/>
    <style jsx>{`
      .onda {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
      }
      
      .onda div {
        position: absolute;
        border: 4px solid #fff;
        opacity: 1;
        border-radius: 50%;
        animation: onda 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }
      
      @keyframes onda {
        0% {
          top: 28px;
          left: 28px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: -1px;
          left: -1px;
          width: 58px;
          height: 58px;
          opacity: 0;
        }
      }
    `}
    </style>
  </div>;
