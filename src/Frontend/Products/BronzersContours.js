import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const BronzersContours = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Bronzing Powder",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Natural-looking bronzer for a sun-kissed glow",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Contour Palette",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Professional contour palette with multiple shades",
      rating: 4.9,
      reviews: 195
    },
    {
      id: 3,
      name: "Cream Bronzer",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Long-lasting cream formula for natural contouring",
      rating: 4.7,
      reviews: 175
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd);
  };

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Bronzers & Contours</h1>
        <p>Discover our collection of premium bronzing and contouring products</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
              <div className="product-overlay">
                <div className="product-actions">
                  <button className="quick-view-btn">
                    <i className="fa-solid fa-eye"></i> Quick View
                  </button>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fa-solid fa-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="product-rating">
                <i className="fa-solid fa-star"></i>
                <span>{product.rating}</span>
                <span>({product.reviews} reviews)</span>
              </div>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BronzersContours;
