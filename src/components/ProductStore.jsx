// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
