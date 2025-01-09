import { Link } from "react-router-dom";
import styles from './Logo.module.css'
function Logo() {
  return (
    <Link to="/" id={styles.logo}>
      Fin<span>Track</span>
    </Link>
  );
}

export default Logo;
