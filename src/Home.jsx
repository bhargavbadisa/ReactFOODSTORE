import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
      <h1>This is Home Page</h1>
      
       {/* Features */}
      <div className="features-container">
        <div className="feature-card">
          <h3>⚡ Quick Shipping</h3>
          <p>Get your order delivered on the same day in key metro areas.</p>

        </div>
        <div className="feature-card">
          <h3>🛍️ Wide Variety</h3>
          <p>Explore thousands of items in diverse categories.</p>

        </div>
        <div className="feature-card">
          <h3>🔒 Safe Checkout</h3>
          <p>Choose from various payment methods, all protected by SSL encryption.</p>

        </div>
      </div>
                  <h1>FOOD STORE PRODUCTS</h1>
      <div className="card-container">
        <section id="veg">
          <Link to="/veg" className="card-link">
            <div className="card">
              <img src="/VegImages/Vegetables.jpg" alt="Vegetables" />
              <h2>Veg</h2>
              <p>Discover our fresh and organic vegetable selection, straight from the farm.</p>
            </div>
          </Link>
        </section>

        <section id="nonveg">
          <Link to="/nonveg" className="card-link">
            <div className="card">
              <img src="/NonVegImages/NonVeg.jpg" alt="Non-Veg" />
              <h2>Non-Veg</h2>
              <p>Fresh meats, poultry, and seafood for your meals.</p>
            </div>
          </Link>
        </section>

        <section id="milk">
          <Link to="/milk" className="card-link">
            <div className="card">
              <img src="/MilkImages/Milks.jpeg" alt="Milk" />
              <h2>Milk</h2>
              <p>Get the best quality milk from local dairy farms delivered to your door.</p>
            </div>
          </Link>
        </section>

        <section id="chocolates">
          <Link to="/chocolates" className="card-link">
            <div className="card">
              <img src="/ChocolateImages/Chocolates.png" alt="Chocolates" />
              <h2>Chocolates</h2>
              <p>Indulge in our delicious range of chocolates from top brands.</p>
            </div>
          </Link>
        </section>
      </div>
              {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} <strong>Sam-store</strong>. All rights reserved.</p>
          <p>
            <a href="/terms" className="footer-link">Terms of Service</a> |
            <a href="/privacy" className="footer-link"> Privacy Policy</a>
          </p>
          <p>Designed & Developed by Simhadri Badisha</p>
        </div>
      </footer>
</>
  );
}

export default Home;
