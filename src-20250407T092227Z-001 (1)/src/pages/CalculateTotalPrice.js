import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalculateTotalPrice = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      const price = order.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setTotalPrice(price);
    }
  }, [order]);

  return (
    <div>
      <h1>Order Total: ${totalPrice.toFixed(2)}</h1>
    </div>
  );
};

export default CalculateTotalPrice;