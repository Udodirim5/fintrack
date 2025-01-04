import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";
const PageNav = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${!isMenuOpen ? styles.navClosed : ''}`}>
        <Logo />
        <ul className={isMenuOpen ? styles.navLinksOpen : ''}>
            <>
              <li>
                <NavLink to="/about" onClick={toggleMenu} >About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={toggleMenu} >Contact</NavLink>
              </li>
            </>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/incomes" onClick={toggleMenu} >Income</NavLink>
              </li>
              <li>
                <NavLink to="/expenses" onClick={toggleMenu} >Expenses</NavLink>
              </li>
              <li>
                <Button onClick={logout} color="#003366">
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className={styles.ctaLink}>
                {isAuthenticated ? 'App' : 'Login'}
              </NavLink>
            </li>
          )}
        </ul>
        <div className={styles['burger-menu']}>
          <HamburgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </nav>
    </header>
  );
};


export default PageNav;
