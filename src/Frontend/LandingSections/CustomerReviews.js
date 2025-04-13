import React from 'react';
import './CustomerReviews.css';

const CustomerReviews = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            image: "https://as1.ftcdn.net/jpg/08/44/84/46/1000_F_844844652_Z3SF4M5HIZsSMkGLt5ts0cr1s5O4mdQL.jpg",
            rating: 5,
            review: "Absolutely love the products! The quality is amazing and I've received so many compliments on my makeup. Highly recommend!"
        },
        {
            id: 2,
            name: "Michael Chen",
            image: "https://as2.ftcdn.net/jpg/08/01/43/09/1000_F_801430964_bqBF9TlN5g9iZ34PBTpaaXxWF3sComuY.jpg",
            rating: 4.8,
            review: "The skincare line has transformed my skin. I've noticed a significant improvement in my complexion since using these products."
        },
        {
            id: 3,
            name: "Jhony Wilson",
            image: "https://as2.ftcdn.net/jpg/06/08/55/73/1000_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg",
            rating: 4.9,
            review: "The hair care products are fantastic! My hair has never looked better. The scent is amazing too!"
        }
    ];

    return (
        <section className="customer-reviews">
            <div className="section-header">
                <h2>Customer Reviews</h2>
                <p>What our customers are saying</p>
            </div>
            
            <div className="reviews-container">
                {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="reviewer-info">
                            <img src={review.image} alt={review.name} className="reviewer-image" />
                            <div className="reviewer-details">
                                <h3>{review.name}</h3>
                                <div className="review-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <i 
                                            key={i} 
                                            className={`fa-solid fa-star ${i < review.rating ? 'active' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="review-text">"{review.review}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CustomerReviews;
