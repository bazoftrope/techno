// Убедитесь, что путь к файлу стилей корректен
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Измените путь согласно структуре вашего проекта
import Image from 'next/image'


const Macadam = () => {

  const [visible, setVisible] = useState(false)
  const [units, setUnits] = useState([])
  const [content, setContent] = useState([{}])

  function isVisible() {
    if (visible === false) setVisible(true)
  }

  function takeContent(obj) {
    setContent(obj)
    isVisible()
  }

  useEffect(() => {
    fetchUnits('щебень');
    setVisible(false)

  }, []);


  async function fetchUnits(col) {
    const response = await fetch('/api/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ col })
    });
    const data = await response.json();
    console.log(data, "data");
    setUnits(data);
  }

  return (
    <div className={styles.listConteiner}>
      <div className={styles.listBTN}>
        {
          units.length > 0 ? units.map((el, index) =>
            <div
              key={el._id}
              className={styles.listElement}
              onClick={() => takeContent(units[index])}
            >
              <div>{el.name}</div>

            </div>
          ) : null
        }
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
