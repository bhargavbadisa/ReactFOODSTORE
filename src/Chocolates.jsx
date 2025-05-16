import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Chocolate.css';
import { AddToCart } from './store';

function Chocolates() {
  const chocolateProducts = useSelector((state) => state.products.Chocolates);
  const dispatch = useDispatch();

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Price ranges
  const priceRanges = [
    { value: '₹1 to ₹50', min: 1, max: 50 },
    { value: '₹51 to ₹100', min: 51, max: 100 },
    { value: '₹101 to ₹200', min: 101, max: 200 },
    { value: '₹201 to ₹500', min: 201, max: 500 },
    { value: 'More than ₹500', min: 501, max: Infinity }
  ];

  const handleCheckboxChange = (value) => {
    if (selectedRanges.includes(value)) {
      setSelectedRanges(selectedRanges.filter((v) => v !== value));
    } else {
      setSelectedRanges([...selectedRanges, value]);
    }
    setCurrentPage(1); // Reset page on filter
  };

  const clearAll = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const activeRanges = priceRanges.filter((range) =>
    selectedRanges.includes(range.value)
  );

  const filteredProducts =
    selectedRanges.length === 0
      ? chocolateProducts
      : chocolateProducts.filter((product) =>
          activeRanges.some(
            (range) => product.price >= range.min && product.price <= range.max
          )
        );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="product-list">
      <h1>Chocolates</h1>

      <div className="filters">
        <h3>Filter by Price:</h3>
        {priceRanges.map((range) => (
          <label key={range.value}>
            <input
              type="checkbox"
              value={range.value}
              checked={selectedRanges.includes(range.value)}
              onChange={() => handleCheckboxChange(range.value)}
            />
            {range.value}
          </label>
        ))}
        <button className="clear-button" onClick={clearAll}>Clear All</button>
      </div>

      <div className="products">
        {currentProducts.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => dispatch(AddToCart(product))}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Previous</button>
        {pageNumbers.map((num) => (
          <button
            key={num}
            className={num === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      <footer>
        <p>&copy; 2025 Food Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Chocolates;
