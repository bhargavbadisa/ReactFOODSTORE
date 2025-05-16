import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NonVeg.css';
import { AddToCart } from './store';

function NonVeg() {
  const nonVegProducts = useSelector((state) => state.products.NonVeg);
  const dispatch = useDispatch();

  // Price Ranges
  const priceRanges = [
    { value: '₹1 to ₹50', min: 1, max: 50 },
    { value: '₹51 to ₹100', min: 51, max: 100 },
    { value: '₹101 to ₹200', min: 101, max: 200 },
    { value: '₹201 to ₹500', min: 201, max: 500 },
    { value: 'More than ₹500', min: 501, max: Infinity }
  ];

  // State for selected ranges
  const [selectedRanges, setSelectedRanges] = useState([]);

  const handleCheckboxChange = (rangeValue) => {
    if (selectedRanges.includes(rangeValue)) {
      setSelectedRanges(selectedRanges.filter(value => value !== rangeValue));
    } else {
      setSelectedRanges([...selectedRanges, rangeValue]);
    }
    setCurrentPage(1); // Reset page
  };

  const handleClearAll = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const activeRanges = priceRanges.filter(range => selectedRanges.includes(range.value));
  const filteredProducts =
    selectedRanges.length === 0
      ? nonVegProducts
      : nonVegProducts.filter(product =>
          activeRanges.some(range => product.price >= range.min && product.price <= range.max)
        );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="product-list">
      <h1>Non-Veg Products</h1>

      {/* Filters */}
      <div className="filters">
        <h4>Filter by Price:</h4>
        {priceRanges.map(range => (
          <label key={range.value} className="range-checkbox">
            <input
              type="checkbox"
              checked={selectedRanges.includes(range.value)}
              onChange={() => handleCheckboxChange(range.value)}
            />
            {range.value}
          </label>
        ))}
        {selectedRanges.length > 0 && (
          <button className="clear-button" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="products">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
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
          ))
        ) : (
          <p>No products found in this range.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>

      <footer>
        <p>&copy; 2025 Food Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default NonVeg;
