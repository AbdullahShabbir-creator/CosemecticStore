import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const EyeLiners = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Liquid Eyeliner",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Precise liquid liner for defined eyes",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Gel Eyeliner",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Long-lasting gel formula with brush",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      name: "Waterproof Eyeliner",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Smudge-proof and waterproof formula",
      rating: 4.7,
      reviews: 198
    }
  ];

  // Parse price for cart
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      // Remove currency symbol and convert to number
      return parseFloat(price.replace(/[^0-9.]/g, ''));
    }
    return price; // If it's already a number
  };

  // Handle add to cart
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
        <h1>Eye Liners</h1>
        <p>Discover our collection of premium eyeliners</p>
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

export default EyeLiners;
