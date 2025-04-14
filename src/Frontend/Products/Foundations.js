import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const Foundations = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Matte Foundation",
      price: 39.99,
      image: "https://www.makeupgallery.pk/cdn/shop/files/89oi90.jpg?v=1744216714&width=330",
      description: "Long-lasting matte finish foundation",
      rating: 4.9,
      reviews: 315
    },
    {
      id: 2,
      name: "Hydrating Foundation",
      price: 44.99,
      image: "https://www.trendify.pk/cdn/shop/products/th_13a6aa78-dc89-4be2-96f8-3fc841a1848d.jpg?v=1662031083://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Water-based foundation for dry skin",
      rating: 4.8,
      reviews: 285
    },
    {
      id: 3,
      name: "Full Coverage Foundation",
      price: 49.99,
      image: "https://lfactorcosmetics.com/cdn/shop/files/1Product.png?v=1700723201&width=535",
      description: "Buildable coverage foundation for all skin types",
      rating: 4.7,
      reviews: 245
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'Foundation');
  };

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Foundations</h1>
        <p>Discover our collection of premium foundations</p>
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

export default Foundations;
