import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductToOrder = ({ orderId }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await axios.post(`/api/orders/${orderId}/add-product`, {
        productId: selectedProduct,
        quantity,
      });
      alert('Product added!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Add Product to Order #{orderId}</h1>
      <select onChange={(e) => setSelectedProduct(e.target.value)}>
        {products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProductToOrder;