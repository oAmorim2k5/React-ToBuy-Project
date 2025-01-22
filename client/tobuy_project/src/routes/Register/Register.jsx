import { Link } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup";
import styles from "./Register.module.css";

const Register = () => {

  const handleSubmit = (values) => console.log(values);

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
      .min(8, "Campo senha deve conter pelo menos 8 caractéres")
      .required("Este campo é obrigatório!")
      .oneOf([yup.ref('password')], 'As senhas não coincidem!'),
  });

  return (
    <div className={styles.Container}>
      <Formik initialValues = {{}} validationSchema={validationRegister} onSubmit={handleSubmit} >
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
                  type="confirmPassword" 
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