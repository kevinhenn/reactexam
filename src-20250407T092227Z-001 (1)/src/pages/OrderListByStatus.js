import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderListByStatus = ({ status }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?status=${status}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [status]);

  return (
    <div>
      <h1>Orders with Status: {status}</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>Order #{order.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderListByStatus;