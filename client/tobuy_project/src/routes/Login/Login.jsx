import { Link } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./login.module.css";
import * as yup from "yup";
import Axios from "axios";

const Login = () => {

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:8800/login", {
      email: values.email,
      password: values.password
    }).then((response) => {
      console.log(response)
    })
  };

  const validationLogin = yup.object().shape({
    email: yup
    .string()
    .email("Não é um email")
    .required("Favor preencher o campo"),
    password: yup
    .string()
    .required("Favor preencher o campo")
  });

  return (
    <div className={styles.Container}>
      <Formik initialValues = {{}} validationSchema={validationLogin} onSubmit={handleClickLogin} >
        <Form>
          <h1>Entrar</h1>
            <div className={styles.inputField}>
              <Field 
                name="email"
                type="email" 
                className={styles.Email} 
                placeholder='Digite seu Email Aqui'/>
              <FaUser className={styles.Icon}/>
              
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"/>
            </div>
            <div className={styles.inputField}>            
              <Field 
                name="password"
                type="password" 
                className={styles.Password} 
                placeholder='Digite sua Senha Aqui'/>
              <FaLock className={styles.Icon}/>
                
              <ErrorMessage
                component="span"
                name="password"
                className="form-error"/> 
            </div>
            <div className={styles.recallForget}>
              <label>
                <input type="checkbox"/>
                Lembre de mim
              </label>
              <Link to="/forgetpassword">Esqueceu sua senha?</Link>
            </div>
            <button type="submit">Entrar</button>
            <div className={styles.signupLink}>
              <p>
                Não tem uma conta ? <Link to="/register">Registrar-se</Link>
              </p>
            </div>
        </Form>
        </Formik>
    </div>
  )
}

export default Login