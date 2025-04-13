import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const FacePowders = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Matte Finishing Powder",
      price: 24.99,
      image: "https://pngimg.com/uploads/face_powder/face_powder_PNG76465.png",
      description: "Long-lasting matte finish with natural look",
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Illuminating Powder",
      price: 29.99,
      image: "https://images.herzindagi.info/image/2020/Jun/types-of-face-powders.jpg",
      description: "Gives a natural glow to your skin",
      rating: 4.8,
      reviews: 95
    },
    {
      id: 3,
      name: "Setting Powder",
      price: 22.99,
      image: "https://thecosmetics.pk/wp-content/uploads/2023/12/pro21.webp",
      description: "Long-lasting setting powder for perfect makeup",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Translucent Powder",
      price: 19.99,
      image: "https://media6.ppl-media.com/mediafiles/blogs/types_of_face_powder_923a4716c8.jpg",
      description: "Lightweight powder for all skin tones",
      rating: 4.6,
      reviews: 0
    },
    {
      id: 5,
      name: "Finishing Powder",
      price: 26.99,
      image: "https://thecosmetics.pk/wp-content/uploads/2024/02/No.3.jpg",
      description: "Perfect finish for your makeup look",
      rating: 4.9,
      reviews: 89
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'FacePowders');
  };

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Face Powders</h1>
        <p>Discover our collection of premium face powders for every skin type</p>
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

export default FacePowders;
