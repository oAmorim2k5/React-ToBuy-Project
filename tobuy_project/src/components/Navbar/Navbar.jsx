import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navbar.module.css";
import {LuCircleUserRound} from "react-icons/lu";

const test = false; // Fazer verificação se o usuário está logado ou não

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.logo}>ToBüy</Link>
      {test ? (
        <>
          <div className={styles.links}>
            <Link className={styles.link} to="/">
              Home
            </Link>
            <Link className={styles.link} to="/contact">
              Contato
            </Link>
            <button
              className={styles.userIcon}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Abrir menu do usuário"
            >
              <LuCircleUserRound className={styles.Icon}/>
            </button>
          </div>
          <div
            className={`${styles.profileMenu} ${
              isMenuOpen ? styles.menuVisible : ""
            }`}
          >
            <Link className={styles.profileLink} to="/profile">
              Perfil
            </Link>
            <button className={styles.logoutButton}>Sair</button>
          </div>
        </>
      ) : (
        <div className={styles.links}>
          <Link className={styles.link} to="/">
            Home
          </Link>
          <Link className={styles.link} to="/contact">
            Contato
          </Link>
          <Link className={styles.link} to="/login">
            Login/Registro
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;