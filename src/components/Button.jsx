/* eslint-disable react/prop-types */
const Button = ({ children, color, border, onClick, id="" }) => {
  const ButtonStyle = {
    backgroundColor: color? color : "transparent",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    border: border? border : `2px solid ${color}`,
  };
  return (
    <button style={ButtonStyle} id={id} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
