import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
      <h1>This is Home Page</h1>

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

      <footer>
        <p>&copy; 2025 Food Store. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;
