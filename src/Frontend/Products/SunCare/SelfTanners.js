import React from 'react';
import { Link } from 'react-router-dom';
import './SunCare.css';
import { useCart } from '../../Context/CartContext';

const SelfTanners = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Gradual Tan Lotion",
      price: 29.99,
      image: "https://m.media-amazon.com/images/I/61xw-USpkHL._SL1500_.jpg",
      description: "Builds a natural-looking tan gradually",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Express Tan Mousse",
      price: 34.99,
      image: "https://m.media-amazon.com/images/I/71VZcFDEvTL._AC_UF1000,1000_QL80_.jpg",
      description: "Quick-drying formula for instant results",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Face Tan Drops",
      price: 24.99,
      image: "https://images-cdn.ubuy.ae/6371d12928f1a254c425601f-kenmiler-natural-glow-self-tanner-medium.jpghttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Customizable tan for the face",
      rating: 4.7,
      reviews: 195
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'SelfTanners');
  };

  return (
    <div className="sun-care-container">
      <div className="section-header">
        <h1>Self Tanners</h1>
        <p>Discover our collection of premium self tanners</p>
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

export default SelfTanners;
