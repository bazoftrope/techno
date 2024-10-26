// Убедитесь, что путь к файлу стилей корректен
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from './styles.module.css'; // Измените путь согласно структуре вашего проекта

const Header = () => {


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
      <div
        className={styles.header_btn}
        onClick={() => handleClick('щебень')}>щебень</div>
      <div
        className={styles.header_btn}
        onClick={() => handleClick('доставка')}>доставка</div>
      <div className={styles.header_btn}
        onClick={() => handleClick('самосвал')}>самосвал</div>

    </div>
  );
};

export default Header;
