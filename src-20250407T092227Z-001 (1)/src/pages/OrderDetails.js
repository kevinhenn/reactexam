import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/order/${id}/`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((error) => console.error("Error fetching order:", error));

    fetch(`http://127.0.0.1:8000/api/orderitem/?order=${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        let total = 0;
        const itemsWithDetails = await Promise.all(
          data.map(async (item) => {
            const productRes = await fetch(item.product);
            const productData = await productRes.json();
            total += productData.price * item.quantity;
            return { ...item, product: productData };
          })
        );
        setItems(itemsWithDetails);
        setTotalPrice(total);
      })
      .catch((error) => console.error("Error fetching order items:", error));
  }, [id]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div>
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status}</p>
      <p>Shipping Address: {order.shipping_addr}</p>
      <p>Ordered on: {new Date(order.date_ordered).toLocaleDateString()}</p>

      <h3>Items:</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product.name} - {item.quantity} x ${item.product.price}
          </li>
        ))}
      </ul>

      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}