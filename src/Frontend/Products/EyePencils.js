import React from 'react';
import { Link } from 'react-router-dom';
import './FacePowders.css';
import { useCart } from '../Context/CartContext';

const EyePencils = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Eyebrow Pencil",
      price: "$19.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNrzyH34YAl2mokMnHgRhPDdFeiGRfwxAxg&sash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Long-lasting eyebrow pencil with sharpener",
      rating: 4.7,
      reviews: 215
    },
    {
      id: 2,
      name: "Eyeliner Pencil",
      price: "$24.99",
      image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shopsy-kajal/o/9/f/5-professional-bold-black-eye-pencil-kajal-felicechiara-original-imah4ykgnsrpz3bd.jpeg?q=90&crop=false",
      description: "Soft and blendable eyeliner pencil",
      rating: 4.8,
      reviews: 198
    },
    {
      id: 3,
      name: "Eyeshadow Pencil",
      price: "$29.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFNvfSSEArr1McneRyyUPATYJkAm82WdfEvw&s",
      description: "Dual-purpose eyeshadow and eyeliner pencil",
      rating: 4.9,
      reviews: 245
    }
  ];

  const parsePrice = (price) => {
    return parseFloat(price.replace('$', ''));
  };

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1,
      price: parsePrice(product.price)
    };
    addToCart(productToAdd, 'EyePencils');
  };

  return (
    <div className="face-powders-container">
      <div className="section-header">
        <h1>Eye Pencils</h1>
        <p>Discover our collection of eye pencils</p>
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

export default EyePencils;
