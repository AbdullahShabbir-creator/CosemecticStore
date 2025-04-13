import React from 'react';
import { Link } from 'react-router-dom';
// import './FaceHighlighters.css';
import { useCart } from '../Context/CartContext';

const FaceHighlighters = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Illuminating Highlighter",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Gives a natural glow to your skin",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: "Bronze Glow Highlighter",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Adds a warm, bronzed glow to your skin",
      rating: 4.7,
      reviews: 128
    },
    {
      id: 3,
      name: "Rose Gold Highlighter",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Luxurious rose gold finish for all skin tones",
      rating: 4.9,
      reviews: 95
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'FaceHighlighters');
  };

  return (
    <div className="face-highlighters-container">
      <div className="section-header">
        <h1>Face Highlighters</h1>
        <p>Discover our collection of premium face highlighters</p>
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

export default FaceHighlighters;
