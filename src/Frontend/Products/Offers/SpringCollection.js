import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import './Offers.css';

const springCollection = [
    {
        id: 1,
        name: "Spring Bloom Palette",
        price: 49.99,
        originalPrice: 69.99,
        image: "https://images.squarespace-cdn.com/content/v1/5720ede5555986b16f146642/1679327122336-BTQ4SKJGSK8XO4VFWREC/23+Spring+Magnolia+SQ.jpg",
        description: "Limited edition spring palette with 12 vibrant shades",
        discount: 30
    },
    {
        id: 2,
        name: "Fresh Start Skincare Set",
        price: 79.99,
        originalPrice: 119.99,
        image: "https://target.scene7.com/is/image/Target/GUEST_2d22540a-0d9f-4f45-a251-509e413d2429",
        description: "Complete skincare routine for spring season",
        discount: 35
    },
    {
        id: 3,
        name: "Spring Essentials Kit",
        price: 59.99,
        originalPrice: 89.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1pRVPQtwyV7F0s6Cl5GudOGMnafL0mEcZMg&s",
        description: "Perfect starter kit for spring makeup",
        discount: 35
    }
];

const SpringCollection = () => {
    const { addToCart } = useCart();
    const handleAddToCart = (product) => {
        addToCart(product, 'SpringCollection', 1);
    };
    return (
        <div className="offer-page">
            <div className="offer-header">
                <h1>Spring Collection</h1>
                <p>Discover our exclusive spring collection with limited edition products</p>
            </div>

            <div className="offer-grid">
                {springCollection.map((product) => (
                    <div key={product.id} className="offer-card">
                        <div className="offer-image">
                            <img src={product.image} alt={product.name} />
                            <div className="discount-badge">
                                {product.discount}% OFF
                            </div>
                        </div>
                        <div className="offer-content">
                            <h3>{product.name}</h3>
                            <p className="product-price">
                                <span className="discounted-price">${product.price.toFixed(2)}</span>
                                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                            </p>
                            <p className="product-description">{product.description}</p>
                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpringCollection;
