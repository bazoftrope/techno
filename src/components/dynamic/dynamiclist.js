import React, { useState, useCallback } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import styles from './styles.module.css';

const DynamicList = ({ items, collection, setUnit }) => {


  const delItem = useCallback(async (id, coll, event) => {
    try {
      const response = await fetch('/api/get', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, coll }),
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении коллекции');
      }
      setUnit(prevUnit => prevUnit.filter(unit => unit._id !== id));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className={styles.dynamiclist}>
      {items.map((item) => (
        <div key={item._id} className={styles.listitem}>
          {Object.entries(item).map(([key, value]) => (
            <div key={key} className={styles.listitemitem}>
              <span className={styles.listitemkey}>{key}</span>
              <span className={styles.listitemvalue}>{value}</span>
            </div>
          ))}
          <button onClick={() => delItem(item._id, collection)}>DEL</button>
        </div>
      ))}
    </div>
  );
};

export default DynamicList;
