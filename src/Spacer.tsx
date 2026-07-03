interface SpacerProps{
    p_size : string,
    p_axis : string,
};

function Spacer({ p_size, p_axis } : SpacerProps){
  const width = p_axis === 'V' ? 1 : p_size;
  const height = p_axis === 'H' ? 1 : p_size;
  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
      }}
    />
  );
};

export default Spacer;