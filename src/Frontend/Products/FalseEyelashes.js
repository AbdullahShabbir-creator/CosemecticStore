import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useCart } from '../Context/CartContext';
import './ProductCard.css';

const FalseEyelashes = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Natural False Eyelashes",
      price: "$19.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDWMlXhewfp8h3X4uyOvVeOgDUGZXkzc6-qw&s",
      description: "Natural-looking false eyelashes for everyday wear",
      rating: 4.8,
      reviews: 215,
      features: [
        "Natural look",
        "Comfortable wear",
        "Up to 20 uses",
        "Easy to apply"
      ]
    },
    {
      id: 2,
      name: "Party False Eyelashes",
      price: "$24.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjNUpjQNc1kukurY6u5shHy89pDKHYJqhGRA&s",
      description: "Dramatic false eyelashes for special occasions",
      rating: 4.6,
      reviews: 189,
      features: [
        "Dramatic look",
        "Long-lasting",
        "Up to 15 uses",
        "Water-resistant"
      ]
    },
    {
      id: 3,
      name: "False Eyelashes Set",
      price: "$34.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqIpaFlzIVCRmUOgeFt8M7ihhL82vVzM5Mdg&s",
      description: "Complete set of false eyelashes for all occasions",
      rating: 4.9,
      reviews: 245,
      features: [
        "3 pairs",
        "Natural to dramatic",
        "Lash glue",
        "Storage case"
      ]
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'FalseEyelashes');
  };

  return (
    <div className="skin-care-container">
      <div className="section-header">
        <h1>False Eyelashes</h1>
        <p>Discover our collection of false eyelashes</p>
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

export default FalseEyelashes;
