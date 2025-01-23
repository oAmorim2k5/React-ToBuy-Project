import { Link } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import * as yup from "yup";
import styles from "./Register.module.css";

const Register = () => {

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:8800/register", {
      email: values.email,
      password: values.password
    }).then((response) => {
      console.log(response)
    })
  };

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Favor verificar se é realmente um email")
      .required("Este campo é obrigatório!"),
    password: yup
      .string()
      .min(8, "Campo senha deve conter pelo menos 8 caractéres")
      .required("Este campo é obrigatório!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem!'),
  });

  return (
    <div className={styles.Container}>
      <Formik initialValues = {{}} validationSchema={validationRegister} onSubmit={handleClickRegister} >
      <Form>
          <h1>Criar conta</h1>
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
            <div className={styles.inputField}>            
                <Field
                  name="confirmPassword"
                  type="password" 
                  className={styles.Password} 
                  placeholder='Repita sua Senha Aqui'/>
                <FaLock className={styles.Icon}/> 
                
                <ErrorMessage
                  component="span"
                  name="confirmPassword"
                  className="form-error"/>
            </div>
            <button type="submit">Registrar-se</button>
            <div className={styles.signupLink}>
              <p>
                Já tem uma conta ? <Link to="/login">Entrar</Link>
              </p>
            </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Register