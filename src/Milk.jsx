import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Milk.css'; // Make sure to style with 3 cards per row
import { AddToCart } from './store';

function Milk() {
  const milkProducts = useSelector((state) => state.products.Milk);
  const dispatch = useDispatch();

  // Price Range Options
  const priceRanges = [
    { value: '₹1 to ₹50', min: 1, max: 50 },
    { value: '₹51 to ₹100', min: 51, max: 100 },
    { value: '₹101 to ₹200', min: 101, max: 200 },
    { value: '₹201 to ₹500', min: 201, max: 500 },
    { value: 'More than ₹500', min: 501, max: Infinity },
  ];

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Handle range toggle
  const handleCheckboxChange = (value) => {
    setCurrentPage(1);
    if (selectedRanges.includes(value)) {
      setSelectedRanges(selectedRanges.filter((v) => v !== value));
    } else {
      setSelectedRanges([...selectedRanges, value]);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  // Filtered product list
  const activeRanges = priceRanges.filter((r) => selectedRanges.includes(r.value));
  const filteredProducts = selectedRanges.length === 0
    ? milkProducts
    : milkProducts.filter((p) =>
        activeRanges.some((range) => p.price >= range.min && p.price <= range.max)
      );

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const milkListItems = currentProducts.map((product, index) => (
    <div key={index} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <button onClick={() => dispatch(AddToCart(product))}>Add To Cart</button>
      </div>
    </div>
  ));

  return (
    <div className="product-list">
      <h1>Milk Products</h1>

      {/* Price Range Filters */}
      <div className="filters">
        <h3>Filter by Price:</h3>
        {priceRanges.map((range) => (
          <label key={range.value}>
            <input
              type="checkbox"
              checked={selectedRanges.includes(range.value)}
              onChange={() => handleCheckboxChange(range.value)}
            />
            {range.value}
          </label>
        ))}
        {selectedRanges.length > 0 && (
          <button className="clear-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Products */}
      <div className="products">{milkListItems}</div>

      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>}
      </div>

      <footer>
        <p>&copy; 2025 Food Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Milk;
