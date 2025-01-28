import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import styles from './contact.module.css';
import { FaUser } from 'react-icons/fa';

const Contact = () => {

  const { setAuth, auth } = useContext(AuthContext);
  const charLimit = 350;

  const validationContact = yup.object().shape({
    username: yup
      .string()
      .required("Favor preencher o campo"),
    email: yup
      .string()
      .email("Não é um email")
      .required("Favor preencher o campo"),
    text: yup
      .string()
      .required("Favor preencher o campo")
      .min(20, "O texto deve ter no mínimo 20 caracteres")
      .max(charLimit, `O texto deve ter no máximo ${charLimit} caracteres`),
  });

  const handleSubmit = async (values, resetForm) => {
    const templateParams = {
      from_name: values.username,
      message: values.text,
      email: values.email,
    };
  
    try {
      const response = await emailjs.send(
        "service_whmg94s",
        "template_nskrm3e",
        templateParams,
        "KCAIt_rr4RlrXhIxk"
      );
      console.log("Email enviado", response.status, response.text);
      resetForm();
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  };

  return (
    <div className={styles.Container}>
        <h1>Contato</h1>
      <Formik
        initialValues={{ username: "", email: "", text: "" }}
        validationSchema={validationContact}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className={styles.inputGroup}>
              <div className={styles.inputField}>
                <div className={styles.text}>
                  <p className={styles.whiteText}>Nome de Identificação</p>
                  <p className={styles.redAsterisk}>*</p>
                </div>
                <Field
                  name="username"
                  type="text"
                  className={styles.Field}
                  placeholder="Digite seu Nome Aqui"
                />
                <FaUser className={styles.Icon} />
                <ErrorMessage
                  component="span"
                  name="username"
                  className={styles.formError}
                />
              </div>
              <div className={styles.inputField}>
              <div className={styles.text}>
                <p className={styles.whiteText}>Email</p>
                <p className={styles.redAsterisk}>*</p>
              </div>
                <Field
                  name="email"
                  type="email"
                  className={styles.Field}
                  placeholder="Digite seu Email Aqui"
                />
                <FaUser className={styles.Icon} />
                <ErrorMessage
                  component="span"
                  name="email"
                  className={styles.formError}
                />
              </div>
            </div>
            <div className={styles.desc}>
              <div className={styles.text}>
                <p className={styles.whiteText}>Mensagem</p>
                <p className={styles.redAsterisk}>*</p>
              </div>
              <Field
                as="textarea"
                name="text"
                rows={5}
                className={styles.descText}
                placeholder="Escreva aqui!"
                maxLength={charLimit}
              />
              <ErrorMessage
                component="span"
                name="text"
                className={styles.formError}
              />
            </div>

            <div className={styles.charCount}>
              {values.text.length}/{charLimit}
            </div>

            <button type="submit" className={styles.submitButton}>
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
