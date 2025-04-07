import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryProducts from "./pages/CategoryProducts";
import OrderList from "./pages/OrderList";
import CustomerDetails from "./pages/CustomerDetails";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/category/:shortcode" element={<CategoryProducts />} />
        <Route path="/orders/:status" element={<OrderList />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
