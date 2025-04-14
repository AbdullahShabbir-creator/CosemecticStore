import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const LipPencils = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Matte Lip Pencil",
      price: "$19.99",
      image: "https://img.drz.lazcdn.com/static/pk/p/8cd7f50eaf9a8b2d0e946e2d4a30c395.jpg_720x720q80.jpg",
      description: "Long-lasting matte lip liner",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Creamy Lip Pencil",
      price: "$24.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5e6zcisD-GGiQ2pW29AbmMOpOu95_7nViQ&s",
      description: "Smooth application with creamy texture",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      name: "Waterproof Lip Pencil",
      price: "$29.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQqPumk2HUIMmXAz1lVqcq3-7V3xCHVyBMA&s",
      description: "Waterproof formula for long-lasting wear",
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
    addToCart(productToAdd, 'LipPencils');
  };

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Lip Pencils</h1>
        <p>Discover our collection of premium lip pencils</p>
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

export default LipPencils;
