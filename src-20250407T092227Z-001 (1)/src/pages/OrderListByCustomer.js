import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderListByCustomer = ({ customerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?customer=${customerId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [customerId]);

  return (
    <div>
      <h1>Orders for Customer {customerId}</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>Order #{order.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderListByCustomer;