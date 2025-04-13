import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';

const EyeBrushes = () => {
  const products = [
    {
      id: 1,
      name: "Eyeshadow Brush",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Soft eyeshadow application brush",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Eyebrow Brush",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Dual-ended eyebrow brush with spoolie",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      name: "Smudge Brush",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Precision smudge brush for eyeliners",
      rating: 4.7,
      reviews: 198
    }
  ];

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Eye Brushes</h1>
        <p>Professional brushes for eye makeup application</p>
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
                  <button className="add-to-cart-btn">
                    <i className="fa-solid fa-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
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

export default EyeBrushes;
