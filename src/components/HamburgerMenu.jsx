/* eslint-disable react/prop-types */
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  burger: {
    position: "relative",
    width: 40,
    height: 30,
    background: "transparent",
    cursor: "pointer",
    display: "block",
  },
  input: {
    display: "none",
  },
  span: {
    display: "block",
    position: "absolute",
    height: 4,
    width: "100%",
    background: "black",
    borderRadius: 9,
    opacity: 1,
    left: 0,
    transform: "rotate(0deg)",
    transition: ".25s ease-in-out",
  },
  span1: {
    top: 0,
    transformOrigin: "left center",
  },
  span2: {
    top: "50%",
    transform: "translateY(-50%)",
    transformOrigin: "left center",
  },
  span3: {
    top: "100%",
    transform: "translateY(-100%)",
    transformOrigin: "left center",
  },
  checkedSpan1: {
    transform: "rotate(45deg)",
    top: 10,
    left: 0,
  },
  checkedSpan2: {
    width: "0%",
    opacity: 0,
  },
  checkedSpan3: {
    transform: "rotate(-45deg)",
    top: 10,
    left: 0,
  },
});

const HamburgerMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const classes = useStyles();

  const toggleChecked = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
    <label className={classes.burger}>
      <input
        type="checkbox"
        className={classes.input}
        checked={isMenuOpen}
        onChange={toggleChecked}
      />
      <span
        className={`${classes.span} ${
          isMenuOpen ? classes.checkedSpan1 : classes.span1
        }`}
      ></span>
      <span
        className={`${classes.span} ${
          isMenuOpen ? classes.checkedSpan2 : classes.span2
        }`}
      ></span>
      <span
        className={`${classes.span} ${
          isMenuOpen ? classes.checkedSpan3 : classes.span3
        }`}
      ></span>
    </label>
  );
};

export default HamburgerMenu;
