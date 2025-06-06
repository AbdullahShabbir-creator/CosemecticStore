import React from 'react';
import { Link } from 'react-router-dom';
import './SunCare.css';
import { useCart } from '../../Context/CartContext';

const SunLotions = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "After Sun Soothing Lotion",
      price: 24.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7tkqBZIN6Zxp1W24mW25V6o5T6p_NW6kVQ&shttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Calming lotion for post-sun exposure",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Hydrating Sun Lotion",
      price: 29.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvJFXYJ4hGBkJfgnB-VguDR_gB6Vwsc2stFw&shttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Intensive hydration for sun-exposed skin",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Sun Repair Lotion",
      price: 32.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9p771E-ZMhjlWl2yVH7G2X7LWOxqv5Rj7rg&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvJFXYJ4hGBkJfgnB-VguDR_gB6Vwsc2stFw&shttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Repair and protect sun-damaged skin",
      rating: 4.7,
      reviews: 195
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'SunLotions');
  };

  return (
    <div className="sun-care-container">
      <div className="section-header">
        <h1>Sun Lotions</h1>
        <p>Discover our collection of premium sun lotions</p>
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

export default SunLotions;
