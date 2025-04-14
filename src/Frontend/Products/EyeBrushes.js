import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import './FacePowders.css';

const EyeBrushes = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Eyeshadow Brush",
      price: "$24.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCfP_06Aw66yYxXO9fZcN3c9IIAXsyzEAGmw&s",
      description: "Soft eyeshadow application brush",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Eyebrow Brush",
      price: "$19.99",
      image: "https://otwoo.com.pk/cdn/shop/products/product-image-1775467194.jpg?v=1623216536&width=2400https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Dual-ended eyebrow brush with spoolie",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      name: "Smudge Brush",
      price: "$24.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9lhWbrXPPsjzeJOgxMA1MLN3uEm8UX7Rx7w&shttps://www.gosupps.com/media/catalog/product/cache/25/image/1500x/040ec09b1e35df139433887a97daa66f/5/1/51ecjCGhxiL.jpghttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Precision smudge brush for eyeliners",
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
      quantity: 1,
      price: parsePrice(product.price)
    };
    addToCart(productToAdd, 'EyeBrushes');
  };

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

export default EyeBrushes;
