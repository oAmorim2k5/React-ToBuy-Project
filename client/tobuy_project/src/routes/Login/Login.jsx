import {FaUser, FaLock} from "react-icons/fa";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {

  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
  }

  return (
    <div className={styles.Container}>
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
            <div className={styles.inputField}>
                <input 
                  type="email" 
                  className={styles.Email} 
                  placeholder='Digite seu Email Aqui!' 
                  onChange={(e) => setEmail(e.target.value)}/>
                <FaUser className={styles.Icon}/>
            </div>
            <div className={styles.inputField}>            
                <input 
                  type="senha" 
                  className={styles.Password} 
                  placeholder='Digite sua Senha Aqui!' 
                  onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className={styles.Icon}/> 
            </div>
            <div className={styles.recallForget}>
              <label>
                <input type="checkbox"/>
                Lembre de mim
              </label>
              <Link to="/forgetpassword">Esqueceu sua senha?</Link>
            </div>
            <button>Entrar</button>
            <div className={styles.signupLink}>
              <p>
                Não tem uma conta ? <Link to="/register">Registrar-se</Link>
              </p>
            </div>
        </form>
    </div>
  )
}

export default Login