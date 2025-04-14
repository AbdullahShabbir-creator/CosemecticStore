import React from 'react';
import { Link } from 'react-router-dom';
import './SpecialOffers.css';

const SpecialOffers = () => {
    const offers = [
        {
            id: 1,
            title: "Spring Collection",
            description: "New arrivals up to 30% off",
            image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
            discount: "30%"
        },
        {
            id: 2,
            title: "Bundle Deals",
            description: "Save more when you buy in sets",
            image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
            discount: "20%"
        },
        {
            id: 3,
            title: "Student Discount",
            description: "Special offer for students",
            image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2",
            discount: "15%"
        }
    ];

    return (
        <section className="special-offers">
            <div className="section-header">
                <h2>Special Offers</h2>
                <p>Exclusive deals and discounts</p>
            </div>
            
            <div className="offers-container">
                {offers.map((offer) => (
                    <div key={offer.id} className="offer-card">
                        <div className="offer-image">
                            <img src={offer.image} alt={offer.title} />
                            <div className="discount-badge">
                                <span>{offer.discount} OFF</span>
                            </div>
                        </div>
                        <div className="offer-content">
                            <h3>{offer.title}</h3>
                            <p>{offer.description}</p>
                            <Link 
                                to={offer.title === "Spring Collection" ? "/offers/spring-collection" : 
                                     offer.title === "Bundle Deals" ? "/offers/bundle-offers" : 
                                     "/offers/student-discounts"}
                                className="shop-now-btn"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpecialOffers;
