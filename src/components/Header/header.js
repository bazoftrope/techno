// Убедитесь, что путь к файлу стилей корректен
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from './styles.module.css';

const Header = () => {
  const heads = ['щебень', 'доставка', 'самосвал']

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
        src="/Image/logo.png"
        alt="ТехноГрупп"
        width={500} // Укажите реальную ширину изображения
        height={300}
      />

      <div className={styles.headerBtnConteiner}>
        {
          heads.map((el, i) =>
            <div
              key={i}
              className={styles.header_btn}
              onClick={() => handleClick(el)}>{el}</div>
          )
        }
      </div>

    </div>
  );
};

export default Header;
