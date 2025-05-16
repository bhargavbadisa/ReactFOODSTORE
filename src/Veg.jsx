import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Veg.css';
import { AddToCart } from './store';

function Veg() {
  const vegProducts = useSelector((state) => state.products.Veg);
  const dispatch = useDispatch();

  // Price Ranges
  const priceRanges = [
    { value: '₹1 to ₹50', min: 1, max: 50 },
    { value: '₹51 to ₹100', min: 51, max: 100 },
    { value: '₹101 to ₹200', min: 101, max: 200 },
    { value: '₹201 to ₹500', min: 201, max: 500 },
    { value: 'More than ₹500', min: 501, max: Infinity }
  ];

  // State
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Handle filter toggle
  const handleCheckboxChange = (value) => {
    const updatedRanges = selectedRanges.includes(value)
      ? selectedRanges.filter((range) => range !== value)
      : [...selectedRanges, value];

    setSelectedRanges(updatedRanges);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  // Get selected price range objects
  const activeRanges = priceRanges.filter((range) =>
    selectedRanges.includes(range.value)
  );

  // Filter products based on selected ranges
  const filteredProducts =
    selectedRanges.length === 0
      ? vegProducts
      : vegProducts.filter((product) =>
          activeRanges.some(
            (range) =>
              product.price >= range.min && product.price <= range.max
          )
        );

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Render individual product cards
  const vegListItems = currentProducts.map((product, index) => (
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
      <h1>Veg Products</h1>

      {/* Price Filter Section */}
      <div className="price-filter">
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

        {/* Show Clear Button only when filters are selected */}
        {selectedRanges.length > 0 && (
          <button className="clear-button" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="products">{vegListItems}</div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Food Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Veg;
