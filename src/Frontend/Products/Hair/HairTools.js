import React from 'react';
import { Link } from 'react-router-dom';
import './Hair.css';
import { useCart } from '../../Context/CartContext';

const HairTools = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Professional Hair Dryer",
      price: 129.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVLPcpE6XYKwAWDkKj35UMe2hSnAtJxhYhWg&s",
      description: "Powerful and professional-grade",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Curling Iron",
      price: 99.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYjp5FfWyY3_y5lrsV4qnBeaeyd7looSDcA&s",
      description: "Professional styling tool",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Hair Straightener",
      price: 119.99,
      image: "https://kiswa.pk/wp-content/uploads/2022/04/2-in-1-Hair-Styling-Comb-Straightener-Hair-Brush-Online-Best-Price-In-Pakistan.jpg",
      description: "Professional-grade styling tool",
      rating: 4.7,
      reviews: 195
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'HairTools');
  };

  return (
    <div className="hair-container">
      <div className="section-header">
        <h1>Hair Tools</h1>
        <p>Discover our collection of premium hair styling tools</p>
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

export default HairTools;
