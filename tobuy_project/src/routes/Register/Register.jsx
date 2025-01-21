import {FaUser, FaLock} from "react-icons/fa";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "";

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    event.preventDefault();
    
    const user = ref.current;

    if (
      !user.email ||
      !user.pass ||
      !user.reppass
    ) {
      return toast.warn("é necessário que todos os campos estejam preenchidos para realizar o cadastro.")
    }
    await axios
      .post("http://localhost:8800", {
        name_user: user.nome.value,
        email_user: user.email.value,
        pass_user: user.pass.value,
        reg_userdate: new Date().toISOString().split('T')[0],
      })
      .then(({ data }) => toast.succedss(data))
      .catch(({ data }) => toast.error(data));
  }
  return to="/home"

  return (
    <div className={styles.Container}>
        <form ref={ref} onSubmit={handleSubmit}>
          <h1>Criar conta</h1>
            <div className={styles.inputField}>
                <input 
                  name="email"
                  type="email" 
                  className={styles.Email} 
                  placeholder='Digite seu Email Aqui' 
                  onChange={(e) => setUsername(e.target.value)}/>
                <FaUser className={styles.Icon}/>
            </div>
            <div className={styles.inputField}>            
                <input 
                  name="pass"
                  type="senha" 
                  className={styles.Password} 
                  placeholder='Digite sua Senha Aqui' 
                  onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className={styles.Icon}/> 
            </div>
            <div className={styles.inputField}>            
                <input 
                  name="reppass"
                  type="senha" 
                  className={styles.Password} 
                  placeholder='Repita sua Senha Aqui' 
                  onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className={styles.Icon}/> 
            </div>
            <button>Registrar-se</button>
            <div className={styles.signupLink}>
              <p>
                Já tem uma conta ? <Link to="/login">Entrar</Link>
              </p>
            </div>
        </form>
    </div>
  )
}

export default Register