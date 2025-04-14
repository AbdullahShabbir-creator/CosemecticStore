import React from 'react';
import './Pages.css';

const AboutUs = () => {
    return (
        <div className="page-container">
            <h1>About Us</h1>
            <div className="page-content">
                <section className="company-info">
                    <h2>Our Story</h2>
                    <p>Welcome to Cosemectic Store, your one-stop destination for premium beauty products. Founded with a passion for enhancing natural beauty, we strive to provide high-quality cosmetics and skincare essentials that make you feel confident and beautiful.</p>
                </section>

                <section className="mission-vision">
                    <div className="mission">
                        <h2>Our Mission</h2>
                        <p>To empower individuals to express their unique beauty through quality products and exceptional service.</p>
                    </div>
                    <div className="vision">
                        <h2>Our Vision</h2>
                        <p>To be the leading beauty destination, trusted for our commitment to quality, innovation, and customer satisfaction.</p>
                    </div>
                </section>

                <section className="values">
                    <h2>Our Values</h2>
                    <ul>
                        <li>Quality - We never compromise on product quality</li>
                        <li>Customer Focus - Your satisfaction is our priority</li>
                        <li>Transparency - We believe in honest communication</li>
                        <li>Innovation - We continuously improve our offerings</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
