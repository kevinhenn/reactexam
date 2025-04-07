import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderList() {
  const { status } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/order/?status=${status}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [status]);

  return (
    <div>
      <h2>Orders - {status}</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - {order.status} - {new Date(order.date_ordered).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}