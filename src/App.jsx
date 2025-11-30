import React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'; // ✅ Notice Navigate import
import Home from './Home';
import Veg from './Veg';
import Cart from './CartComponent';
import Signing from './Signing';
import SignUp from './SignUp';
import Chocolates from './Chocolates';
import AboutUs from './AboutUs';
import Orders from './Orders';
import ContactUs from './ContactUs';
import Milk from './Milk';
import NonVeg from './NonVeg';
import './main.css'; // Your CSS file
import { useSelector } from 'react-redux';

function App() {
  const cartObjects = useSelector(globalState => globalState.cart);
  const totalCartCount = cartObjects.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="logo">🛒 FOOD STORE</div>
        <ul className="nav-list">
          <li><Link to="/home">🏠Home</Link></li>
          <li><Link to="/veg">🥦Veg</Link></li>
          <li><Link to="/nonVeg">🍗NonVeg</Link></li>
          <li><Link to="/milk">🥛Milk</Link></li>
          <li><Link to="/Chocolates">🍫Chocolates</Link></li>
          <li><Link to="/contactUs">📞ContactUs</Link></li>
          <li><Link to="/CartComponent">🛒Cart({totalCartCount})</Link></li>
          <li><Link to="/aboutUs">ℹ️AboutUs</Link></li>
          <li><Link to="/signing">👤Signing</Link></li>
          <li><Link to="/orders">📦Orders</Link></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> {/* ✅ Redirect root to /home */}
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/CartComponent" element={<Cart />} />
          <Route path="/signing" element={<Signing />} />
           <Route path="/signUp" element={<SignUp />} />
          <Route path="/Chocolates" element={<Chocolates />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/nonVeg" element={<NonVeg />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
