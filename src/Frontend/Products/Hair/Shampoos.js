import React from 'react';
import { Link } from 'react-router-dom';
import './Hair.css';
import { useCart } from '../../Context/CartContext';

const Shampoos = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Hydrating Shampoo",
      price: 24.99,
      image: "https://allurebeauty.pk/cdn/shop/files/1256417-1-688601.jpg?v=1711022683&width=320https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Deep hydration for dry hair",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Anti-Dandruff Shampoo",
      price: 29.99,
      image: "https://reana.pk/cdn/shop/files/Hyaluronicshampoofrontandback_6008be13-cf73-43c4-b69f-fb9aec5e0c56.webp?v=1689852649https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Formulated to combat dandruff",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Volume Shampoo",
      price: 32.99,
      image: "https://m.media-amazon.com/images/I/41H5QxUZNsL._SL500_.jpg",
      description: "Adds volume and body to fine hair",
      rating: 4.7,
      reviews: 195
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'Shampoos');
  };

  return (
    <div className="hair-container">
      <div className="section-header">
        <h1>Shampoos</h1>
        <p>Discover our collection of premium shampoos</p>
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

export default Shampoos;
