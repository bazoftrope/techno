import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
// import { useRouter } from 'next/router';
import Add from '../add/add'



function Admin() {
  // const router = useRouter();

  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState({});
  const [schemaInput, setSchemaInput] = useState('');
  const [product, setProduct] = useState('document')

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleClick = (value) => {
    setProduct(value)
  };
  async function fetchCollections() {
    try {
      const response = await fetch('/api/collections');
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const schemaStr = schemaInput;
    console.log(schemaStr, 'schema')
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: collectionName, schema: schemaStr }),
      });
      if (!response.ok) {
        throw new Error('Ошибка при добавлении коллекции');
      }
      setCollections((prevCollections) => [...prevCollections, collectionName]);
      setCollectionName('');
      setSchemaInput('')
    } catch (error) {
      console.error(error);
    }
  };

  const delCollection = async (col, event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/collections', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: col }),
      })
      if (!response.ok) {
        throw new Error('Ошибка при удалении коллекции');
      }
      console.log(response, 'Привет от delCollection!')
      setCollections(prevCollections => prevCollections.filter(el => el !== col));
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className={styles.adminConteiner}>
      <div className={styles.adminHeader}>
        <form className={styles.adminForm} onSubmit={handleSubmit}>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Введите имя коллекции"
            required
          />
          <input
            id={styles.schemaInput}
            type="text"
            value={schemaInput}
            onChange={(e) => setSchemaInput(e.target.value)}
            placeholder="Например: цена порода"
            required
          />
          <button id={styles.collectionBtn} type="submit">+</button>
        </form>
        <div className={styles.adminCollections}>
          {collections.length > 0 ? collections.map((el, index) => (
            <div
              key={index}
              className={el === 'document' ? styles.docColBTN : styles.colBTN}
              onClick={() => handleClick(el)}

            >
              {el === 'document'
                ?
                (<div
                  id={styles.docColBTN}
                >

                  <div>{'doc!'}</div>
                  <div></div>
                </div>)
                :
                (<div
                  id={styles.incolBTN}
                >

                  <div>{el}</div>
                  <div><button onClick={(e) => delCollection(el, e)}>DEL</button></div>
                </div>)}

            </div>
          )) : null}
        </div>
      </div>

      <div className={styles.adminBody}>
        <Add product={product} />
      </div>
    </div>
  );
}

export default Admin;
