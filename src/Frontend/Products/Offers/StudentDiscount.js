import React from 'react';
import { Link } from 'react-router-dom';
import './Offers.css';

const studentDiscounts = [
    {
        id: 1,
        name: "Student Makeup Set",
        price: 39.99,
        originalPrice: 59.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjW2UJ_M2taVnYThbs-Kq1cqIp9yPAkGCHKw&s",
        description: "Perfect for students - essential makeup products",
        discount: 35,
        studentOnly: true
    },
    {
        id: 2,
        name: "Student Skincare Kit",
        price: 29.99,
        originalPrice: 49.99,
        image: "https://m.media-amazon.com/images/I/614kswvW4CL._SL1500_.jpg",
        description: "Basic skincare routine for students",
        discount: 40,
        studentOnly: true
    },
    {
        id: 3,
        name: "Student Travel Size Set",
        price: 24.99,
        originalPrice: 39.99,
        image: "https://letsglamorize.pk/cdn/shop/collections/Untitled_design_7.png?v=1725349426",
        description: "Perfect for dorm room or travel",
        discount: 40,
        studentOnly: true
    }
];

const StudentDiscount = () => {
    return (
        <div className="offer-page">
            <div className="offer-header">
                <h1>Student Discounts</h1>
                <p>Special offers for students - show your student ID at checkout</p>
            </div>

            <div className="offer-grid">
                {studentDiscounts.map((product) => (
                    <div key={product.id} className="offer-card">
                        <div className="offer-image">
                            <img src={product.image} alt={product.name} />
                            <div className="discount-badge">
                                {product.discount}% OFF
                            </div>
                            {product.studentOnly && (
                                <div className="student-badge">
                                    Student Only
                                </div>
                            )}
                        </div>
                        <div className="offer-content">
                            <h3>{product.name}</h3>
                            <p className="product-price">
                                <span className="discounted-price">${product.price.toFixed(2)}</span>
                                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                            </p>
                            <p className="product-description">{product.description}</p>
                            <Link to={`/product/${product.id}`} className="add-to-cart-btn">
                                Add to Cart
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentDiscount;
