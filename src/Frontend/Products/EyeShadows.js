import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const EyeShadows = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Matte Eyeshadow Palette",
      price: "$34.99",
      image: "https://images.ctfassets.net/wlke2cbybljx/3dREGg2g7ydNpB4X9n2Zr4/882ee53857827b390d9d2ee874309475/BELLASOFIA.jpg",
      description: "Versatile matte shades for everyday looks",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Shimmer Eyeshadow Palette",
      price: "$39.99",
      image: "https://m.media-amazon.com/images/I/81gM3HUH51L._SL1500_.jpg",
      description: "Dazzling shimmer shades for glamorous looks",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      name: "Cream Eyeshadow",
      price: "$24.99",
      image: "https://www.cosmeticsdiary.pk/cdn/shop/files/yves-saint-laurent-2-empowered-silver-yves-saint-laurent-sequin-crush-mono-eyeshadows-31343170093143_533x.jpg?v=1719584827",
      description: "Long-lasting cream formula for intense color",
      rating: 4.7,
      reviews: 198
    },
    {
      id: 4,
      name: "Shimmer Eyeshadow Palette",
      price: "$39.99",
      image: "https://m.media-amazon.com/images/I/81gM3HUH51L._SL1500_.jpg",
      description: "Dazzling shimmer shades for glamorous looks",
      rating: 4.9,
      reviews: 245
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
    addToCart(productToAdd, 'EyeShadows');
  };

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Eye Shadows</h1>
        <p>Discover our collection of premium eyeshadows</p>
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

export default EyeShadows;
