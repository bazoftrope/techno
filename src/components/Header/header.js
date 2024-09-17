// Убедитесь, что путь к файлу стилей корректен
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from './styles.module.css'; // Измените путь согласно структуре вашего проекта

const Header = () => {
  const [collections, setCollections] = useState({});


  useEffect(() => {
    fetchCollections();
  }, []);


  async function fetchCollections() {
    try {
      const response = await fetch('/api/collections');
      const data = await response.json();
      setCollections(data.filter(el => el !== 'document'));
    } catch (error) {
      console.error(error);
    }
  }

  const router = useRouter();
  const handleClick = (category) => {
    router.push(`/product?category=${category}`);
  };
  const homeClick = () => {
    router.push(`/`);
  };

  return (
    <div className={styles.headerContainer}>
      <Image
        onClick={() => homeClick()}

        className={styles.headerLogo}
        src={require('../../Image/logo.png')}
        alt="ТехноГрупп" />

      <div className={styles.headerLinks}>
        {
          collections.length > 0 ? collections.map(el =>
            <div
              className={styles.headerElement}
              onClick={() => handleClick(el)}
            >{el}</div>) : null
        }
      </div>
    </div>
  );
};

export default Header;
