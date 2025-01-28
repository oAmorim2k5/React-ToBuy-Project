import React, { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { FaListAlt, FaCheckCircle, FaClock, FaChevronDown } from 'react-icons/fa';
import { CiCamera } from 'react-icons/ci';
import styles from './profile.module.css';
import moment from 'moment';

function Profile() {
  const { user } = useContext(UserContext);
  const [showStats, setShowStats] = useState(true);
  const [showLists, setShowLists] = useState(true);
  const [search, setSearch] = useState('');
  const statsDate = moment(user.reg_userdate).format('DD [de] MMMM [de] YYYY');
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(URL.createObjectURL(file));
    }
  };

  if (!user) return <p>Loading user information...</p>;

  const filteredLists = Array.isArray(user.lists) ? user.lists.filter((list) =>
    list.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.profileInfo}>
        <div className={styles.profilePictureContainer}>
          <img
            src={newProfilePic || user.profilePicture || 'iconsUser/iconDefault.png'}
            alt="User Profile"
            className={styles.profilePicture}
          />
          <label className={styles.changePictureOption}>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ display: 'none' }} 
            />
            <CiCamera className={styles.cameraIcon} />
          </label>
        </div>
          <div className={styles.userInfo}>
            <h1>{user.name_user}</h1>
            <p>Cadastrado em: {new Date(user.reg_userdate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className={styles.mainContent}>
          <section>
            <h2 onClick={() => setShowStats(!showStats)} className={styles.sectionToggle}>
              Estatísticas
              <FaChevronDown className={`${styles.arrowIcon} ${showStats ? styles.open : ''}`} />
            </h2>
            {showStats && (
              <div className={styles.statsSection}>
                <ul>
                  <li><FaListAlt /> Listas Criadas: <strong>10</strong></li>
                  <li><FaClock /> Última Lista Criada: <strong>22 de Janeiro, 2025</strong></li>
                  <li><FaCheckCircle /> Listas Concluídas: <strong>8</strong></li>
                </ul>
              </div>
            )}
          </section>
          <section>
            <h2 onClick={() => setShowLists(!showLists)} className={styles.sectionToggle}>
              Suas Listas
              <FaChevronDown className={`${styles.arrowIcon} ${showLists ? styles.open : ''}`} />
            </h2>
            {showLists && (
              <div className={styles.listsSection}>
                <div className={styles.searchAndFilter}>
                  <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                  <select className={styles.filterSelect}>
                    <option value="">Filtrar por categoria</option>
                    <option value="categoria1">Categoria 1</option>
                    <option value="categoria2">Categoria 2</option>
                    <option value="categoria3">Categoria 3</option>
                  </select>
                </div>
                <ul>
                  {filteredLists.length > 0 ? (
                    filteredLists.map((list, index) => (
                      <li key={index} className={styles.listItem}>
                        <span>{list.name}</span> - <em>{list.date}</em>
                      </li>
                    ))
                  ) : (
                    <p>Nenhuma lista encontrada.</p>
                  )}
                </ul>
              </div>
            )}
          </section>
        </div>
      </header>
    </div>
  );
}

export default Profile;
