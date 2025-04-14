import React from 'react';
import { Link } from 'react-router-dom';
import './Hair.css';
import { useCart } from '../../Context/CartContext';

const HairOils = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Argan Oil",
      price: 29.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMhjKo1tN2j7jnL_fz-Ny1VftGP0WyS7W32g&s",
      description: "Deeply nourishing for all hair types",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Coconut Oil",
      price: 24.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRnYixJokMN3Z-_3eqsYV-gIue79LnxN-4QHAI412l90zWMWPMw3JU8ahyLM21QG_iGsg&usqp=CAU",
      description: "Natural conditioning and shine",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Castor Oil",
      price: 26.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE8uCj0R0bLmS7gdSNHf7hXj6QEsbVvebvuw&s",
      description: "Promotes hair growth and strength",
      rating: 4.7,
      reviews: 195
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'HairOils');
  };

  return (
    <div className="hair-container">
      <div className="section-header">
        <h1>Hair Oils</h1>
        <p>Discover our collection of premium hair oils</p>
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

export default HairOils;
