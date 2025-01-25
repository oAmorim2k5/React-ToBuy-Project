import React, { useContext } from 'react'
import { UserContext} from '../../Contexts/UserContext';
import styles from './profile.module.css'

function Profile() {
  const { setUser, user } = useContext(UserContext);

  if (!user) return <p>Carregando informações...</p>;

  return (
    <div className={styles.Container}>
      <div className={styles.profileContainer}>
        <div className={styles.topBar}>
          <div className={styles.square}>
                <img
                src="https://th.bing.com/th/id/OIP.kAX6fV3H992W9kCOECts8AHaJI?rs=1&pid=ImgDetMain"
                alt="Imagem no círculo"
                className={styles.squareImage}
                />
          </div>
          <h1>👋 Olá, {user.name_user}</h1>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.userStats}>
            <p>📝 Listas Criadas: <strong>10</strong></p>
            <p>📌 Tópicos Mais Usados: <strong>Alimentos</strong> | <strong>Bebidas</strong> | <strong>Limpeza</strong></p>
            <p>💡 Última lista criada: <strong>22 de janeiro de 2025</strong></p>
            <p>🌟 Listas Concluídas: <strong>8</strong></p>
          </div>

          <div className={styles.userGoals}>
            <h3>🎯 Conquistas</h3>
            
          </div>

          <div className={styles.userMotivation}>
            <p>✨ "Organize suas compras, economize tempo e cuide do seu dia!"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile