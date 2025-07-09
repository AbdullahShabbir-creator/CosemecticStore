import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const LipSticks = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Matte Lipstick",
      price: "$24.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHNqREEBdWHIvMJnz2jXCrxHU7oi2sl4cjwg&shttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Long-lasting matte formula",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Glossy Lipstick",
      price: "$29.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPOUVA5uyk3Vp_1ufvWp7qQlqxrRmDyzlFeg&s",
      description: "Radiant finish with natural shine",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      name: "Cream Lipstick",
      price: "$34.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRBDCMfZXo4tm8SMTdZx419pTi81O6NWisqQ&s",
      description: "Moisturizing formula with smooth texture",
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
    addToCart(productToAdd, 'LipSticks');
  };

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Lipsticks</h1>
        <p>Discover our collection of premium lipsticks</p>
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
              <h3 className="product-name">
                <Link 
                  to={`/product/lipsticks/${product.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {product.name}
                </Link>
              </h3>
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

export default LipSticks;
