import React, { useEffect, useState, useRef } from 'react';
import styles from './styles.module.css';
import Dynamic from '../../dynamic/dynamiclist'

function AddProductForm({ product }) {
  const [inputs, setInputs] = useState([])
  const [unit, setUnit] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null);

  useEffect(() => {
    getForms(product);
    fetchUnits(product);
  }, [product]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const searchParams = new URLSearchParams();
    Array.from(formData.entries()).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    try {
      const url = '/api/save?collection=' + encodeURIComponent(product);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: searchParams.toString(),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных');
      }

      const result = await response.json();
      setUnit(prevUnits => [...prevUnits, result.data]);
      formRef.current.reset(); // Очистка формы после успешной отправки
      setSubmitted(true); // Set submitted to true after successful submission
      setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
      // Здесь можно добавить логику обновления списка продуктов
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const getForms = async (name) => {
    try {
      const response = await fetch('/api/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error('Ошибка при добавлении коллекции');
      }
      const data = await response.json()
      setInputs(data)
      console.log(inputs, 'inputs')
    } catch (error) {
      console.error(error);
    }
  };

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
    setUnit(data);
  }

  return (
    <div className={styles.addConteiner}>
      <div className={styles.adminForm}>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          {inputs.map((key) => (
            <div key={key} className={styles.formgroup}>
              <label htmlFor={key}>{key}</label>
              <input id={key} name={key} type="text" className={styles.formcontrol} />
            </div>
          ))}
          <button type="submit" className={styles.btnprimary}>{submitted ? 'Submitted' : 'Save'}</button>
        </form>
      </div>
      <div className={styles.adminProducts}>
        <h1>{product}</h1>
        <Dynamic items={unit} collection={product} setUnit={setUnit} />
      </div>
    </div>
  );
}

export default AddProductForm;
