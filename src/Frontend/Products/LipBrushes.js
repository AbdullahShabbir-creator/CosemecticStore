import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';

const LipBrushes = () => {
  const products = [
    {
      id: 1,
      name: "Lip Brush",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Professional-grade lip brush",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Lip Liner Brush",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Precision lip liner brush",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      name: "Lip Contour Brush",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Dual-ended lip contour brush",
      rating: 4.7,
      reviews: 198
    }
  ];

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Lip Brushes</h1>
        <p>Professional brushes for lip makeup application</p>
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

export default LipBrushes;
