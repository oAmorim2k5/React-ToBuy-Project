import {FaUser, FaLock} from "react-icons/fa";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
  }

  return (
    <div className={styles.Container}>
        <form onSubmit={handleSubmit}>
          <h1>Criar conta</h1>
            <div className={styles.inputField}>
                <input type="email" className={styles.Email} placeholder='Digite seu Email Aqui' onChange={(e) => setUsername(e.target.value)}/>
                <FaUser className={styles.Icon}/>
            </div>
            <div className={styles.inputField}>            
                <input type="senha" className={styles.Password} placeholder='Digite sua Senha Aqui' onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className={styles.Icon}/> 
            </div>
            <div className={styles.inputField}>            
                <input type="senha" className={styles.Password} placeholder='Repita sua senha' onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className={styles.Icon}/> 
            </div>
            <button>Registrar-se</button>
            <div className={styles.signupLink}>
              <p>
                Já tem uma conta ? <Link to="/login">Login</Link>
              </p>
            </div>
        </form>
    </div>
  )
}

export default Register