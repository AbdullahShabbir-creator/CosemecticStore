import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import './Offers.css';

const bundleOffers = [
    {
        id: 1,
        name: "Complete Makeup Bundle",
        price: 149.99,
        originalPrice: 239.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f2707266",
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
        image: "https://images.unsplash.com/photo-1572635196237-14b3f2707266",
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
        image: "https://images.unsplash.com/photo-1572635196237-14b3f2707266",
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
    return (
        <div className="offer-page">
            <div className="offer-header">
                <h1>Bundle Offers</h1>
                <p>Save big with our curated product bundles</p>
            </div>

            <div className="offer-grid">
                {bundleOffers.map((bundle) => (
                    <div key={bundle.id} className="offer-card">
                        <div className="offer-image">
                            <img src={bundle.image} alt={bundle.name} />
                            <div className="discount-badge">
                                {bundle.discount}% OFF
                            </div>
                        </div>
                        <div className="offer-content">
                            <h3>{bundle.name}</h3>
                            <p className="product-price">
                                <span className="discounted-price">${bundle.price.toFixed(2)}</span>
                                <span className="original-price">${bundle.originalPrice.toFixed(2)}</span>
                            </p>
                            <p className="product-description">{bundle.description}</p>
                            <ul className="bundle-items">
                                {bundle.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <Link to={`/product/${bundle.id}`} className="add-to-cart-btn">
                                Add to Cart
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BundleOffer;
