import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import {LuCircleUserRound} from "react-icons/lu";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.logo} to={"/home"}>ToBüy</Link>
      {auth ? (
        <>
          <div className={styles.links}>
            <Link className={styles.link} to="/home">
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