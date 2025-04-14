import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useCart } from '../Context/CartContext';
import './ProductCard.css';

const EyelashCurlers = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Professional Eyelash Curler",
      price: "$24.99",
      image: "https://img.drz.lazcdn.com/static/pk/p/bcca230059325fd472d9b4cd4644a573.jpg_720x720q80.jpg_.webp",
      description: "Professional-grade eyelash curler for perfect curls",
      rating: 4.8,
      reviews: 215,
      features: [
        "Spring mechanism",
        "Comfort grip",
        "Adjustable curve",
        "Heat-resistant"
      ]
    },
    {
      id: 2,
      name: "Travel Eyelash Curler",
      price: "$19.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvqqRXrufaJLHOr6HD_zoQsYepGLcq0Vj4w&s",
      description: "Compact eyelash curler for on-the-go use",
      rating: 4.6,
      reviews: 189,
      features: [
        "Compact design",
        "Lightweight",
        "Travel case",
        "Easy to use"
      ]
    },
    {
      id: 3,
      name: "Eyelash Curler Set",
      price: "$39.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2UTk_Jk7WC3qEsG9FJgXlqicSYTqLDmxyug&s",
      description: "Complete set of eyelash curling tools",
      rating: 4.9,
      reviews: 245,
      features: [
        "2 curlers",
        "1 comb",
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
    addToCart(productToAdd, 'EyelashCurlers');
  };

  return (
    <div className="skin-care-container">
      <div className="section-header">
        <h1>Eyelash Curlers</h1>
        <p>Discover our collection of professional eyelash curlers</p>
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

export default EyelashCurlers;
