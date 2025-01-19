import styles from './home.module.css'
import homeIMG from '../../assets/homeImg.png'

const Home = () => {
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