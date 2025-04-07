import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CategoryProducts() {
  const { shortcode } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/product/?category=${shortcode}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [shortcode]);

  return (
    <div>
      <h2>Products in {shortcode}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}