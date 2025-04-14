import React from 'react';
import { Link } from 'react-router-dom';
import './SkinCare.css';
import { useCart } from '../../Context/CartContext';

const Toners = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Balancing Toner",
      price: 22.99,
      image: "https://www.nirvanabotanics.com/cdn/shop/files/Pink-Toner_02.jpg?v=1726491931https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Restores skin's natural pH balance",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Hydrating Toner",
      price: 24.99,
      image: "https://bnbderma.com/cdn/shop/files/glycolic.jpg?v=1734510888https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Lightweight formula for all skin types",
      rating: 4.9,
      reviews: 195
    },
    {
      id: 3,
      name: "Pore Minimizing Toner",
      price: 26.99,
      image: "https://www.nirvanabotanics.com/cdn/shop/files/glowtonerpakistan.png?v=1741453660https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Helps reduce the appearance of pores",
      rating: 4.7,
      reviews: 175
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'Toners');
  };

  return (
    <div className="skin-care-container">
      <div className="section-header">
        <h1>Facial Toners</h1>
        <p>Discover our collection of premium facial toners</p>
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

export default Toners;
