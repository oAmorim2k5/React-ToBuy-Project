import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css'
import homeIMG from '../../Assets/homeIMG.png'

function Home(){
  const { setAuth, auth } = useContext(AuthContext)
  const { user } = useContext(UserContext)

  const navigate = useNavigate();

  const handlerClick = () => {
    if(auth){
      console.log("Já logado")
    } else {
      navigate('/login')
    }
  };

  return (
    <div className={styles.container}>
      {auth ? (
        <>
          <div className={styles.text}>
            <h1>Bem vindo de volta ao ToBüy, {user.name_user.split(' ')[0]}</h1>
            <p>Continue criando listas, organizando suas compras, compartilhando com amigos e familiares!</p>
            <button className={styles.button} onClick={handlerClick}>Criar lista</button>
          </div>
          <div className={styles.image}>
            <img src={homeIMG} alt="Imagem ToBüy" />
          </div>
        </>
      ) : (
        <>
          <div className={styles.text}>
            <h1>Bem vindo ao ToBüy</h1>
            <p>Crie listas, organize as compras, compartilhe com amigos e familiares!</p>
            <button className={styles.button} onClick={handlerClick}>Criar lista</button>
          </div>
          <div className={styles.image}>
            <img src={homeIMG} alt="Imagem ToBüy" />
          </div>
        </>
        
      )};
    </div>
  )
}

export default Home;