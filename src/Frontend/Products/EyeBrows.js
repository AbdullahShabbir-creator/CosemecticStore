import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const EyeBrows = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Brow Pencil",
      price: "$19.99",
      image: "https://m.media-amazon.com/images/I/41xUBB7qWEL._SL500_.jpg",
      description: "Precision brow pencil for defined brows",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 2,
      name: "Brow Pomade",
      price: "$24.99",
      image: "https://static.beautytocare.com/cdn-cgi/image/width=1440,height=1200,f=auto/media/catalog/product//m/a/makeup-revolution-brow-pomade-medium-brown-2-5g_1.jpg",
      description: "Long-lasting pomade for sculpted brows",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      name: "Brow Gel",
      price: "$14.99",
      image: "https://img.drz.lazcdn.com/collect/my/p/6b60154402fd6615845e5547878a2a4e.jpg_960x960q80.jpg_.webp",
      description: "Clear gel for setting and taming brows",
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
    addToCart(productToAdd, 'EyeBrows');
  };

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Eye Brows</h1>
        <p>Discover our collection of premium eyebrow products</p>
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

export default EyeBrows;
