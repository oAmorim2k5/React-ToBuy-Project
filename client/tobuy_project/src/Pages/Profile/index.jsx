import React, { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { FaListAlt, FaCheckCircle, FaClock, FaEdit } from 'react-icons/fa';
import styles from './profile.module.css';
import moment from 'moment';

function Profile() {
  const { user } = useContext(UserContext);
  const statsDate = moment(user.reg_userdate).format('DD [de] MMMM [de] YYYY')

  if (!user) return <p>Loading user information...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.profileInfo}>
          <div className={styles.profilePictureContainer}>
            <img
              src={user.profilePicture || 'iconsUser/iconDefault.png'}
              alt="User Profile"
              className={styles.profilePicture}
            />
          </div>
          <div className={styles.userInfo}>
            <h1>{user.name_user}</h1>
            <p>Cadastrado em: {new Date(user.reg_userdate).toLocaleDateString()}</p>
            <button className={styles.editProfileButton}><FaEdit /> Edit Profile</button>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.statsSection}>
          <h2>Estatísticas</h2>
          <ul>
            <li><FaListAlt /> Lists Created: <strong>10</strong></li>
            <li><FaClock /> Last List Created: <strong>January 22, 2025</strong></li>
            
            <li><FaCheckCircle /> Completed Lists: <strong>8</strong></li>
          </ul>
        </section>

        <section className={styles.listsSection}>
          <h2>Suas listas</h2>
          {user.lists && user.lists.length > 0 ? (
            <ul>
              {user.lists.map((list, index) => (
                <li key={index} className={styles.listItem}>
                  <span>{list.name}</span> - <em>{list.date}</em>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma lista encontrada, comece criando uma lista</p>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>"Organize suas compras, polpe tempo, e aproveite o seu dia!"</p>
      </footer>
    </div>
  );
}

export default Profile;
