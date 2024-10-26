// Убедитесь, что путь к файлу стилей корректен
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Измените путь согласно структуре вашего проекта
import Image from 'next/image'
import { data } from './data'


const Macadam = () => {
  const Data = data

  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState({})

  function isVisible() {
    if (visible === false) setVisible(true)
  }




  return (
    <div className={styles.listConteiner}>
      <div className={styles.listBTN}>

        <div
          className={styles.listElement}
          onClick={() => { setVisible(true); setContent(Data['5-20']) }}
        >
          <div >5-20</div>
        </div>
        <div
          className={styles.listElement}
          onClick={() => { setVisible(true); setContent(Data['20-40']) }}
        >
          <div >20-40</div>
        </div>
        <div
          className={styles.listElement}
          onClick={() => { setVisible(true); setContent(Data['40-70']) }}
        >
          <div >40-70</div>
        </div>
        <div
          className={styles.listElement}
          onClick={() => { setVisible(true); setContent(Data['0-200']) }}
        >
          <div >0-200</div>
        </div>


      </div>
      {visible ? (<div className={styles.macadamElementContent}>
        <div className={styles.MEC}>
          <div className={styles.macadamOptions}>

            <div className={styles.macadamDesc}>

              <div>насыпной коэфф-  {content.coef}</div>
              <div>морозостойкость- {content.frost}</div>
              <div>марка прочности- {content.mark}</div>
              <div>порода- {content.breed}</div>
              <div>цена- {content.price}</div>
            </div>

            <div className={styles.macadamPictname}>
              <div className={styles.macadamTitle}>фракция {content.name}</div>
              <Image className={styles.macadamImg} src={require('../../../Image/' + content.name + '.jpg')} alt={content.name} />
            </div>

          </div>

        </div>

      </div>) : null}
    </div>
  );
};

export default Macadam;
