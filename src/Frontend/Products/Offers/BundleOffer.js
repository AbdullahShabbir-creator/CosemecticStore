import React from 'react';
import { useCart } from '../../Context/CartContext';

import './Offers.css';

const bundleOffers = [
    {
        id: 1,
        name: "Complete Makeup Bundle",
        price: 149.99,
        originalPrice: 239.99,
        image: "https://m.media-amazon.com/images/I/71gi11m8qHL._SL1500_.jpg",
        description: "Everything you need for a flawless look",
        items: [
            "12-Color Eye Shadow Palette",
            "Full Size Foundation",
            "Setting Powder",
            "Lipstick Set",
            "Makeup Brushes"
        ],
        discount: 40
    },
    {
        id: 2,
        name: "Skincare Starter Bundle",
        price: 99.99,
        originalPrice: 159.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-i64LICCIDDY_hux3-G8Z5aHyxnQ7jR81fA&s",
        description: "Essential skincare routine in one package",
        items: [
            "Cleanser",
            "Toner",
            "Moisturizer",
            "Sunscreen",
            "Face Mask"
        ],
        discount: 40
    },
    {
        id: 3,
        name: "Beauty Essentials Bundle",
        price: 79.99,
        originalPrice: 129.99,
        image: "https://m.media-amazon.com/images/I/818qpq20JxL._SL1500_.jpg",
        description: "Must-have products for your daily routine",
        items: [
            "Lipstick",
            "Mascara",
            "Eyeliner",
            "Blush",
            "Setting Spray"
        ],
        discount: 40
    }
];

const BundleOffer = () => {
    const { addToCart } = useCart();
    const handleAddToCart = (product) => {
        addToCart(product, 'BundleOffer', 1);
    };
    return (
        <div className="offer-page">
            <div className="offer-header">
                <h1>Bundle Deals</h1>
                <p>Save more when you buy in sets</p>
            </div>

            <div className="offer-grid">
                {bundleOffers.map((product) => (
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
                            <ul>
                                {product.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
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

export default BundleOffer;
