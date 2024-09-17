// Убедитесь, что путь к файлу стилей корректен
import React from 'react';
import styles from './styles.module.css'; // Измените путь согласно структуре вашего проекта

const Dump = () => {



  return (
    <div className={styles.dumpConteiner}>
      <div className={styles.dumpTitle}>САМОСВАЛ</div>

    </div>
  );
};

export default Dump;
