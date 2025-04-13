import React from 'react';
import { Link } from 'react-router-dom';
import './Hair.css';
import { useCart } from '../../Context/CartContext';

const HairMasks = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Hydrating Hair Mask",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Intensive moisture treatment for dry hair",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Repair Hair Mask",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Deep conditioning for damaged hair",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Nourishing Hair Mask",
      price: 44.99,
      image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Intensive nourishment for all hair types",
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
    <div className="hair-container">
      <div className="section-header">
        <h1>Hair Masks</h1>
        <p>Discover our collection of premium hair masks</p>
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

export default HairMasks;
