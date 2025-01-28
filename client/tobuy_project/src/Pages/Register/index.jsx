import { Link, useNavigate } from "react-router-dom";
import {FaUser, FaLock} from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from 'react';
import debounce from "lodash.debounce";
import Axios from "axios";
import * as yup from "yup";
import styles from "./Register.module.css";

const Register = () => {

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:8800/auth/register", {
      email: values.email,
      password: values.password
    }).then((response) => {
      console.log(response.data.msg);
      if (response.data.msg === "Usuário cadastrado com sucesso") {
        setEmail(values.email);
        setIsFormVisible(false)
      };
    })
    .catch((err) => {
      console.error("Erro no cadastro:", err);
      alert("Houve um erro ao tentar cadastrar.");
    });
  };

  const handleSubmitUsername = (values) => {
    Axios.post("http://localhost:8800/auth/update-username", {
      email: email,
      username: values.username,
    })
      .then((response) => {
        console.log(response)
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
    .required("Este campo é obrigatório!")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/,
      "O email deve ser de um domínio válido (gmail, hotmail, yahoo, etc.)"
    )
    .test(
      "email-is-available",
      "Este email já está registrado",
      async (values) => {
        if (!values) return false;

        try {
          const response = await Axios.post("http://localhost:8800/auth/email-isreleased", {
            email: values.email,
          });

          if (response.status === 200 && response.data.msg === "Email liberado") {
            return true; 
          } else {
            return false; 
          }
        } catch (err) {
          console.error("Erro ao verificar email:", err);
          return false; 
        }
      }
    ),
    password: yup
      .string()
      .matches(
        /^(?=(.*[a-zA-Z]){3,})(?=(.*\d){3,})(?=(.*[!@#$%^&*(),.?":{}|<>]){1,})/,
        "A senha deve conter pelo menos 3 letras, 3 números e 1 caractere especial"
      )
      .min(7, "Campo senha deve conter pelo menos 7 caractéres")
      .required("Este campo é obrigatório!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não coincidem!"),
    username: yup
      .string()
      .max(18, "O nome de usuário só pode conter 18 caractéres")
      .matches(/^[a-zA-Z0-9\s]*$/, "O nome de usuário não pode conter caracteres especiais"),
  });

  return (
    <div className={styles.Container}>
    {isFormVisible ? (
    <>
      <Formik 
        initialValues = {{}} 
        validationSchema={validationRegister} 
        onSubmit={handleClickRegister} >
      <Form>
          <h1>Criar conta</h1>
            <div className={styles.inputField}>
              <div className={styles.text}>
                <p className={styles.whiteText}>Email</p>
                <p className={styles.redAsterisk}>*</p>
              </div>      
                <Field 
                  name="email"
                  type="email" 
                  className={styles.Email} 
                  placeholder='Digite seu Email Aqui'
                  />
                <FaUser className={styles.Icon}/>

                <ErrorMessage
                  component="span"
                  name="email"
                  className={styles.formError}/>
            </div>
            <div className={styles.inputField}>
              <div className={styles.text}>
                <p className={styles.whiteText}>Senha</p>
                <p className={styles.redAsterisk}>*</p>
              </div>                  
                <Field 
                  name="password"
                  type="password" 
                  className={styles.Password} 
                  placeholder='Digite sua Senha Aqui'/>
                <FaLock className={styles.Icon}/>

                <ErrorMessage
                  component="span"
                  name="password"
                  className={styles.formError}/> 
            </div>
            <div className={styles.inputField}>  
                <div className={styles.text}>
                  <p className={styles.whiteText}>Senha novamente</p>
                  <p className={styles.redAsterisk}>*</p>
                </div>                
                <Field
                  name="confirmPassword"
                  type="password" 
                  className={styles.Password} 
                  placeholder='Repita sua Senha Aqui'/>
                <FaLock className={styles.Icon}/> 
                
                <ErrorMessage
                  component="span"
                  name="confirmPassword"
                  className={styles.formError}/>
            </div>
            <button type="submit">Registrar-se</button>
            <div className={styles.signinLink}>
              <p>
                Já tem uma conta ? <Link to="/login">Entrar</Link>
              </p>
            </div>
        </Form>
      </Formik>
      </>
    ) : (
      <>
      <Formik
        initialValues={{}}
        validationSchema={validationRegister}
        onSubmit= {handleSubmitUsername}
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

            <ErrorMessage
              component="span"
              name="username"
              className={styles.formErrorUser}/>
            <button type="submit">Confirmar</button>
          </div>
        </Form>
      </Formik>
    </>
    )}
    </div>
)};

export default Register