import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useCart } from '../Context/CartContext';
import './ProductCard.css';

const CleansingSponges = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Silicone Cleansing Brush",
      price: "$29.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUsuaYVoLp8Odzvp0tmK7nAF7XHtI_-dT6wg&s",
      description: "Advanced silicone cleansing brush for deep cleaning",
      rating: 4.8,
      reviews: 215,
      features: [
        "2-speed settings",
        "Waterproof",
        "Replaceable heads",
        "Travel-friendly"
      ]
    },
    {
      id: 2,
      name: "Konjac Sponge",
      price: "$14.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQz2gpy_4ZC2JlG1EEviOjFiDNarLb0mg3Ag&s",
      description: "Natural konjac sponge for gentle cleansing",
      rating: 4.6,
      reviews: 189,
      features: [
        "100% natural",
        "Hypoallergenic",
        "Gentle exfoliation",
        "Biodegradable"
      ]
    },
    {
      id: 3,
      name: "Cleansing Sponge Set",
      price: "$34.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq2ubFcCX3UJ_qn10OMTX1KtxSEjkE20FNdA&s",
      description: "Complete set of cleansing tools",
      rating: 4.9,
      reviews: 245,
      features: [
        "3 sponges",
        "1 brush",
        "Storage case",
        "Travel-friendly"
      ]
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'CleansingSponges');
  };

  return (
    <div className="skin-care-container">
      <div className="section-header">
        <h1>Cleansing Sponges</h1>
        <p>Discover our collection of facial cleansing tools</p>
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
              <div className="product-specs">
                <h4>Features:</h4>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CleansingSponges;
