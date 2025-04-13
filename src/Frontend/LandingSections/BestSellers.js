import React from 'react';
import { Link } from 'react-router-dom';
import './BestSellers.css';

const BestSellers = () => {
    const bestSellers = [
        {
            id: 1,
            title: "Matte Lipstick",
            price: 2499,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOnPOqCckNomXKLMSROaG-YPMwKR86pXzEQ&s",
            rating: 4.8,
            reviews: 125
        },
        {
            id: 2,
            title: "Hydrating Serum",
            price: 3999,
            image: "https://m.media-amazon.com/images/I/51Cjp+BNNZL._SY450_.jpg",
            rating: 4.9,
            reviews: 98
        },
        {
            id: 3,
            title: "Volumizing Mascara",
            price: 2299,
            image: "https://plus.unsplash.com/premium_photo-1679106764781-1387196b5945?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.7,
            reviews: 156
        },
        {
            id: 4,
            title: "Nourishing Shampoo",
            price: 1999,
            image: "https://healthwire.pk/wp-content/uploads/2022/04/hair-care-routine-to-get-healthy-hair.jpg",
            rating: 4.8,
            reviews: 210
        }
    ];

    return (
        <section className="best-sellers">
            <div className="section-header">
                <h2>Best Sellers</h2>
                <p>Our most loved products by customers</p>
            </div>
            
            <div className="best-sellers-grid">
                {bestSellers.map((product) => (
                    <div key={product.id} className="best-seller-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className="product-info">
                            <h3>{product.title}</h3>
                            <div className="product-rating">
                                {[...Array(5)].map((_, i) => (
                                    <i 
                                        key={i} 
                                        className={`fa-solid fa-star ${i < product.rating ? 'active' : ''}`}
                                    />
                                ))}
                                <span>({product.reviews} reviews)</span>
                            </div>
                            <div className="price">${(product.price / 100).toFixed(2)}</div>
                            <Link to={`/product/${product.id}`} className="add-to-cart-btn">
                                Add to Cart
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestSellers;
