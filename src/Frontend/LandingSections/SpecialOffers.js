import React from 'react';
import { Link } from 'react-router-dom';
import './SpecialOffers.css';

const SpecialOffers = () => {
    const offers = [
        {
            id: 1,
            title: "Spring Collection",
            description: "New arrivals up to 30% off",
            image: "https://th.bing.com/th/id/OIP.G4BSD-Ub24oRAvurcz2ZYQHaHa?rs=1&pid=ImgDetMain",
            discount: "30%"
        },
        {
            id: 2,
            title: "Bundle Deals",
            description: "Save more when you buy in sets",
            image: "https://th.bing.com/th/id/OIP.-xR5MR0D1q45BRoiux8ryQHaJ3?w=736&h=981&rs=1&pid=ImgDetMain",
            discount: "20%"
        },
        {
            id: 3,
            title: "Student Discount",
            description: "Special offer for students",
            image: "https://th.bing.com/th/id/R.5a9b00e98eae868915abe932db8d12ad?rik=DAuP4kSKiT625w&pid=ImgRaw&r=0",
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
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
