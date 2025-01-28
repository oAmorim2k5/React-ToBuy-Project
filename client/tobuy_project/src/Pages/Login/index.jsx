import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import { AuthContext } from '../../Contexts/AuthContext';
import { UserContext } from "../../Contexts/UserContext";
import * as yup from "yup";
import Axios from "axios";
import styles from "./login.module.css";

const Login = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogin = async (values) => {
    try {
      if (!values.email || !values.password) {
        setErrors({
          email: values.email ? "" : "O campo Email é obrigatório.",
          password: values.password ? "" : "O campo Senha é obrigatório.",
        });
        return;
      }
      const response = await Axios.post("http://localhost:8800/auth/login", {
        email: values.email,
        password: values.password,
      });
      try {
        const userDataResponse = await Axios.post("http://localhost:8800/user/user-data", {
          email: values.email,
        });
        setUser(userDataResponse.data);
  
      } catch (error) {
        if (error.response?.status === 404) {
          console.error("Usuário não encontrado. Email não está cadastrado.");
        } else {
          console.error("Erro ao buscar dados do usuário:", error.response?.data || error.message);
        }
        return;
      }
      setAuth(true);
      navigate("/home")
      console.log("Login bem-sucedido:", response.data);
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
    }
  };

  const validationLogin = yup.object().shape({
    email: yup
    .string()
    .required("Favor preencher o campo"),
    password: yup
    .string()
    .required("Favor preencher o campo")
  });

  return (
    <div className={styles.Container}>
      <div className={styles.RegContainer}>
        <Formik initialValues = {{}} validationSchema={validationLogin} onSubmit={handleClickLogin} >
          <Form>
            <h1>Entrar</h1>
              <div className={styles.inputField}>
                <Field 
                  name="email"
                  type="email" 
                  className={styles.Email} 
                  placeholder='Email'/>
                <FaUser className={styles.Icon}/>
                
                <ErrorMessage
                  component="span"
                  name="email"
                  className={styles.formError}/>
              </div>
              <div className={styles.inputField}>      
                <Field 
                  name="password"
                  type="password" 
                  className={styles.Password} 
                  placeholder='Senha'/>
                <FaLock className={styles.Icon}/>
                  
                <ErrorMessage
                  component="span"
                  name="password"
                  className={styles.formError}/> 
              </div>
              <div className={styles.recallForget}>
                <label>
                  <input type="checkbox" />
                  Lembre de mim
                </label>
                <Link to="/forgetpassword">Esqueceu sua senha?</Link>
              </div>
              <button type="submit">Entrar</button>
              <div className={styles.signupLink}>
                <p>
                  Não tem uma conta ? <Link to="/register">Registre-se</Link>
                </p>
              </div>
          </Form>
          </Formik>
      </div>
    </div>
  )
}

export default Login