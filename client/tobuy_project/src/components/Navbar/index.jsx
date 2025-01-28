import {  useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import React from "react";
import {LuCircleUserRound} from "react-icons/lu";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/home" },
    { name: "Perfil", path: "/profile" },
    { name: "Listas", path: "/profile" },
    { name: "Contato", path: "/contact" }
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.logo} to={"/home"}>ToBüy</Link>
      {auth ? (
        <>
         <div className={styles.links}>
            {links.map((link, index) => (
              <React.Fragment key={index}>
                <Link className={styles.link} to={link.path}>{link.name}</Link>
                {index < links.length - 1 && <span className={styles.separator}>|</span>}
              </React.Fragment>
            ))}
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