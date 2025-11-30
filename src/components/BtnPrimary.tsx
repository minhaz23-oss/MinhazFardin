const BtnPrimary = ({text,color}:any) => {
  return (
    <button className="styled-button hover-target"
     style={{'--corner-color': color} as React.CSSProperties}
    >
      <h1 style={{
        color: color,
        fontWeight: 700,
      }}>{text}</h1>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
    </button>
  );
};

export default BtnPrimary;
