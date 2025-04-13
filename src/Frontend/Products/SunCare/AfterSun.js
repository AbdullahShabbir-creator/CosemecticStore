import React from 'react';
import { Link } from 'react-router-dom';
import './SunCare.css';
import { useCart } from '../../Context/CartContext';

const AfterSun = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "After Sun Cooling Gel",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Soothing gel for post-sun exposure",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "After Sun Moisturizing Lotion",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Intensive hydration for sun-exposed skin",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "After Sun Repair Cream",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Repair and soothe sun-damaged skin",
      rating: 4.7,
      reviews: 195
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
    <div className="sun-care-container">
      <div className="section-header">
        <h1>After Sun Products</h1>
        <p>Discover our collection of premium after sun products</p>
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

export default AfterSun;
