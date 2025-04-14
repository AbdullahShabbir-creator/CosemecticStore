import React from 'react';
import { Link } from 'react-router-dom';
import './Hair.css';
import { useCart } from '../../Context/CartContext';

const Conditioners = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Hydrating Conditioner",
      price: 24.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZNeoyeLbHbT8XaRxjPHW3mx43BOutyI7Jnw&s",
      description: "Intensive moisture for dry hair",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Anti-Dandruff Conditioner",
      price: 29.99,
      image: "http://m.media-amazon.com/images/I/31nt5iti2hL.jpg",
      description: "Soothing formula for itchy scalp",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Volume Conditioner",
      price: 32.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHmaIAbMiAaEDB3JYEMDIaBotnlM4K0FsseBQGhZedS7g7aJVeJrPOM4WAg2B4ujNKUo0&usqp=CAU",
      description: "Lightweight formula for fine hair",
      rating: 4.7,
      reviews: 195
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'Conditioners');
  };

  return (
    <div className="hair-container">
      <div className="section-header">
        <h1>Conditioners</h1>
        <p>Discover our collection of premium conditioners</p>
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

export default Conditioners;
