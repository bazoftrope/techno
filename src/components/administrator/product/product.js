import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

function Product() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/get');
      const data = await response.json();
      console.log(data, "data");
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!selectedProductId) return;
    console.log(selectedProductId, '<-----product');
    const response = await fetch('/api/get', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectedProductId,
      }),
    });

    if (response.ok) {
      const updatedProducts = products.filter(product => product._id !== selectedProductId);
      setProducts(updatedProducts);
      setSelectedProductId(null);
    } else {
      console.error('Ошибка удаления продукта');
    }
  };


  return (
    <div className={styles.productConteiner}>
      {products.length > 0 ? (


        products.map(product => (
          <div key={product._id}>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.description}</li>
            <li>{product.use}</li>
            <li>{product.breed}</li>
            <li>{product['bulk coefficient']}</li>
            <li>{product['frost-resistance']}</li>
            <li>{product['Strength grade']}</li>
            <button onClick={() => setSelectedProductId(product._id)}>V</button>
          </div>
        ))) : (<p>Loading...</p>)}
      <button onClick={() => handleDelete()}>DELETE</button>
    </div>
  );
}

export default Product;
