/* eslint-disable react/prop-types */
const Button = ({
  children,
  color,
  className,
  border,
  onClick,
  id = "",
  textColor,
}) => {
  const ButtonStyle = {
    backgroundColor: color ? color : "transparent",
    color: textColor ? textColor : "white",
    padding: "0.5rem 1rem",
    borderRadius: ".4375rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    border: border ? border : `2px solid ${color}`,
    transition: "all 0.3s ease-in-out",
  };

  return (
    <button style={ButtonStyle} className={className} id={id} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
