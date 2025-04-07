import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/customer/${id}/`)
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error("Error fetching customer:", error));

    fetch(`http://127.0.0.1:8000/api/order/?customer=${id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [id]);

  if (!customer) return <p>Loading customer details...</p>;

  return (
    <div>
      <h2>{customer.name}</h2>
      <p>Email: {customer.email}</p>
      <p>Address: {customer.address}</p>
      
      <h3>Order History</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}