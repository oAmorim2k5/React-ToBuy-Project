import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navbar.module.css";
import imgIcon from "../img/useIcon.png";

const test = false; // Fazer verificação se o usuário está logado ou não

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>ToBüy</div>
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
              <img src={imgIcon} className={styles.img} alt="Ícone do Usuário" />
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
            Login
          </Link>
          <Link className={styles.link} to="/register">
            Cadastro
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;