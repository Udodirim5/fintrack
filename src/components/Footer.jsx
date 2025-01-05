import { Link } from 'react-router-dom';
import styles from './Footer.module.css'
const Footer = () => {
  const x = '/'; // replace with actual link to your homepage
  return (
    <footer className={styles.footer}>
      <div className={styles.circle}></div>
      <p>Made by <Link to={`${x}`}>Dev Memoirs</Link> </p>
      <p>&copy; 2025 FinTrack. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
