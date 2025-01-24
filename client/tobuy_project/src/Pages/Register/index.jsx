import { Link, useNavigate } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from 'react';
import Axios from "axios";
import * as yup from "yup";
import styles from "./Register.module.css";

const Register = () => {

  const [isUsernamePromptVisible, setIsUsernamePromptVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:8800/register", {
      email: values.email,
      password: values.password
    }).then((response) => {
      alert(response.data.msg);
      if (response.data.msg === "Cadastrado com sucesso") {
        setEmail(values.email);
        setIsUsernamePromptVisible(true);
        setIsFormVisible(false)
      };
    })
    .catch((err) => {
      console.error("Erro no cadastro:", err);
      alert("Houve um erro ao tentar cadastrar.");
    });
  };

  const handleSubmitUsername = (values) => {
    Axios.post("http://localhost:8800/update-username", {
      email: email,
      username: values.username,
    })
      .then((response) => {
        alert("Nome de usuário atualizado com sucesso para: " + response.data.username);
        setIsUsernamePromptVisible(false);
        navigate('/login')
      })
      .catch((err) => {
        console.error("Erro ao atualizar o username:", err);
        alert("Houve um erro ao tentar atualizar o nome de usuário.");
      });
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
    <>
    {isFormVisible && (
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
            <div className={styles.signinLink}>
              <p>
                Já tem uma conta ? <Link to="/login">Entrar</Link>
              </p>
            </div>
        </Form>
      </Formik>
      </div>
    )}
    {isUsernamePromptVisible && (
      <div className={styles.Container}>
      <Formik
        initialValues={{ username: "" }}
        onSubmit={handleSubmitUsername}
      >
        <Form>
          <h1>Usuário</h1>
          <div className={styles.inputFieldUser}>
            <Field
              type="text"
              name="username"
              className={styles.username}
              placeholder="Nome de usuário"
            />
            <button type="submit">Confirmar</button>
          </div>
        </Form>
      </Formik>
      </div>
    )}
    </>
  )
}

export default Register