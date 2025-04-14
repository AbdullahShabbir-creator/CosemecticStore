import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useCart } from '../Context/CartContext';
import './ProductCard.css';

const MakeupSponges = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Premium Beauty Blender",
      price: "$24.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTrw1P21nKTT9MzY_dJhxMRw6dlObtyjBVQ&s",
      description: "Professional makeup sponge for flawless application",
      rating: 4.8,
      reviews: 215,
      features: [
        "Latex-free",
        "Anti-bacterial",
        "Water-activated",
        "Durable"
      ]
    },
    {
      id: 2,
      name: "Silicone Makeup Sponge",
      price: "$19.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwhtfeOVD1C10aeLJAhy254f-5WWykG57OYA&s",
      description: "Silicone sponge for precise foundation application",
      rating: 4.6,
      reviews: 189,
      features: [
        "Silicone material",
        "Easy to clean",
        "Non-porous",
        "Hypoallergenic"
      ]
    },
    {
      id: 3,
      name: "Makeup Applicator Set",
      price: "$29.99",
      image: "https://lotshop.pk/cdn/shop/files/branded-professional-makeup-brushes-by-weight-ultra-soft-available-in-kgs-110647.jpg?v=1740325490&width=533",
      description: "Complete set of makeup applicators",
      rating: 4.9,
      reviews: 245,
      features: [
        "3 sponges",
        "2 brushes",
        "Storage case",
        "Travel-friendly"
      ]
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'MakeupSponges');
  };

  return (
    <div className="skin-care-container">
      <div className="section-header">
        <h1>Makeup Sponges</h1>
        <p>Discover our collection of professional makeup sponges</p>
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

export default MakeupSponges;
