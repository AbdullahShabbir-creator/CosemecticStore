import React from 'react';
import { useCart } from '../../Context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd);
  };

  return (
    <div className="product-card">
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
  );
};

export default ProductCard;
