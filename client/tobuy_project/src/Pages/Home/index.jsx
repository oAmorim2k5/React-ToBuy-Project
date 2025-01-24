import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css'
import homeIMG from '../../Assets/homeIMG.png'

function Home(){
  const { setAuth, auth } = useContext(AuthContext)
  console.log('auth', auth);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Bem vindo ao ToBüy</h1>
        <p>Crie listas, organize as compras, compartilhe com amigos e familiares!</p>
        <button className={styles.button}>Criar lista</button>
      </div>
      <div className={styles.image}>
        <img src={homeIMG} alt="Imagem ToBüy" />
      </div>
    </div>
  )
}

export default Home;