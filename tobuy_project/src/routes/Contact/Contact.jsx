import { FaUser } from "react-icons/fa";
import styles from "./contact.module.css";
import { useState } from "react";

const Contact = () => {

  const [useremail, setEmail] = useState("");
  const [charCount, setCharCount] = useState(0);
  const charLimit = 350;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(useremail);
  }

  return (
    <div className={styles.Container}>
        <form onSubmit={handleSubmit}>
          <h1>Contato</h1>
            <div className={styles.inputField}>
              <input type="email" className={styles.Email} placeholder='Digite seu Email Aqui!' onChange={(e) => setEmail(e.target.value)}/>
              <FaUser className={styles.Icon}/>
            </div>
            <div className={styles.desc}>
              <textarea 
                type="text" 
                rows={5} 
                className={styles.descText} 
                placeholder="Escreva aqui!" 
                maxLength={charLimit}
                onChange={(e) => setCharCount(e.target.value.length)}>
                </textarea>
            </div>
            <div className={styles.charCount}>
              {charCount}/{charLimit}
            </div>
            <button>Enviar</button>
        </form>
    </div>
  )
}

export default Contact