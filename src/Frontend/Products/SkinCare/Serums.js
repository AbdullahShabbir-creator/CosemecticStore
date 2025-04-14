import React from 'react';
import { Link } from 'react-router-dom';
import './SkinCare.css';
import { useCart } from '../../Context/CartContext';

const Serums = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Vitamin C Serum",
      price: 39.99,
      image: "https://www.alezem.com/cdn/shop/products/1_f73cef40-99db-48d3-837d-0f2a7ee9de74.png?v=1581328747https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Brightening serum with 20% Vitamin C",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Hyaluronic Acid Serum",
      price: 34.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW3VspSwpU_pYlGMFiQM6vaZCPrvYPPjJbcg&shttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Intensive hydration for all skin types",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Retinol Serum",
      price: 44.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dsIrNA9XHDqlRlN_eJBxF-m6E7rQmqDaIA&shttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Anti-aging serum with 2% retinol",
      rating: 4.7,
      reviews: 195
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'Serums');
  };

  return (
    <div className="skin-care-container">
      <div className="section-header">
        <h1>Serums</h1>
        <p>Discover our collection of premium facial serums</p>
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

export default Serums;
