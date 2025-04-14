import React from 'react';
import { Link } from 'react-router-dom';
import './SkinCare.css';
import { useCart } from '../../Context/CartContext';

const FaceMasks = () => {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Hydrating Sheet Mask",
      price: 19.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqqfWthcQ_Z1cJBvFGdWvOgE2-Vm7Md38ZMw&shttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Intensive hydration for dry skin",
      rating: 4.9,
      reviews: 245
    },
    {
      id: 2,
      name: "Charcoal Purifying Mask",
      price: 24.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbRSL--rMJlcsDDnMHLf-Zzdca2WgGwvvChlEXtchFZCqo7L2LugRfih0jQN05QtSVDTQ&usqp=CAUhttps://images.squarespace-cdn.com/content/v1/5c4f6ba1e2ccd1ee6075495d/83bfd75e-3e51-4f26-afa7-30db2a532f68/woman-sheet-face-mask.jpghttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Deep cleansing mask for oily skin",
      rating: 4.8,
      reviews: 215
    },
    {
      id: 3,
      name: "Glow Sheet Mask",
      price: 22.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-14_L4Vq47GsChy_Kb2uTWTyJrmDdFDSbD9JQiFK-eOtTaDZSQQLEJRTrLDqhm7S-bQU&usqp=CAUhttps://feeds.abplive.com/onecms/images/uploaded-images/2023/02/19/778ca958ea2e2fcf2e59ffb0c2420458f12cb.jpeghttps://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
      description: "Radiant skin in just 15 minutes",
      rating: 4.7,
      reviews: 195
    }
  ];

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd, 'FaceMasks');
  };

  return (
    <div className="skin-care-container">
      <div className="section-header">
        <h1>Face Masks</h1>
        <p>Discover our collection of premium face masks</p>
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

export default FaceMasks;
