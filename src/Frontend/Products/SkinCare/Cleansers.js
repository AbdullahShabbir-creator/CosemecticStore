import React from 'react';
import { Link } from 'react-router-dom';
import './SkinCare.css';
import { useCart } from '../../Context/CartContext';

const Cleansers = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Gentle Cleansing Milk",
      price: 24.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoEe3By8aPIaQNJ0jqYPdDUoKaVocBFEC_lA&sttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Gentle formula for all skin types",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Foaming Face Wash",
      price: 29.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTRGvi3v69TxCBcHmyyAADkTCGH9hk9k4hA&shttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Deep cleansing foaming formula",
      rating: 4.9,
      reviews: 195
    },
    {
      id: 3,
      name: "Micellar Water",
      price: 22.99,
      image: "https://bnbderma.com/cdn/shop/files/3_2ae5e5ef-f7e1-49bc-912d-0f0b1aff8a1e.png?v=1734509162https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Gentle makeup remover and cleanser",
      rating: 4.7,
      reviews: 175
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'Cleansers');
  };

  return (
    <div className="skin-care-container">
      <div className="section-header">
        <h1>Cleansers</h1>
        <p>Discover our collection of premium facial cleansers</p>
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

export default Cleansers;
