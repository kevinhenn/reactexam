import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetail = ({ orderId }) => {
  const [order, setOrder] = useState(null);

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

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <h2>Order Items</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.product.id}>{item.product.name} x {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;