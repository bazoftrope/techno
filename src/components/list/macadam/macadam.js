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

  const macadamData = [
    { label: "Насыпной коэффициент", value: content.coef },
    { label: "Морозостойкость", value: content.freez },
    { label: "Марка прочности", value: content.mark },
    { label: "Порода", value: content.breed },
    { label: "Цена", value: content.price }
  ];



  return (
    <div className={styles.listConteiner}>
      <div className={styles.listBTN}>
        {
          Object.keys(Data).map(el =>
            <div
              className={styles.listElement}
              onClick={() => { setVisible(true); setContent(Data[el]) }}
            >
              <div >{el}</div>
            </div>

          )
        }


      </div>
      {visible ? (<div className={styles.macadamElementContent}>
        <div className={styles.MEC}>
          <div className={styles.macadamOptions}>
            <div className={styles.tableNameCont}>
              <div className={styles.macadamTitle}>фракция {content.name}</div>
              <table className={styles.macadam_table}>
                <tbody>
                  {macadamData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.label}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.macadamPictname}>

              <Image
                className={styles.macadamImg}
                src={`/Image/${content.name}.jpg`}
                alt={content.name}
                width={500}
                height={300}

              />
            </div>

          </div>

        </div>

      </div>) : null}
    </div>
  );
};

export default Macadam;
