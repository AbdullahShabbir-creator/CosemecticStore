import React from 'react';
import './Pages.css';

const ShippingPolicy = () => {
    return (
        <div className="page-container">
            <h1>Shipping Policy</h1>
            <div className="page-content">
                <section className="shipping-section">
                    <h2>Effective Date: April 14, 2025</h2>
                    <p>Thank you for shopping at Cosemectic Store. This policy outlines our shipping procedures and important information about your order.</p>
                </section>

                <section className="shipping-section">
                    <h2>1. Shipping Areas</h2>
                    <ul>
                        <li>We ship to all 50 states in the United States</li>
                        <li>International shipping is available to select countries</li>
                        <li>Shipping restrictions may apply to certain products</li>
                    </ul>
                </section>

                <section className="shipping-section">
                    <h2>2. Shipping Methods</h2>
                    <div className="shipping-methods">
                        <div className="method">
                            <h3>Standard Shipping</h3>
                            <ul>
                                <li>Free for orders over $50</li>
                                <li>$5.99 for orders under $50</li>
                                <li>Estimated delivery: 5-7 business days</li>
                            </ul>
                        </div>
                        <div className="method">
                            <h3>Express Shipping</h3>
                            <ul>
                                <li>$12.99 for all orders</li>
                                <li>Estimated delivery: 2-3 business days</li>
                                <li>Not available for international orders</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="shipping-section">
                    <h2>3. Shipping Timeline</h2>
                    <ul>
                        <li>Orders placed before 2 PM EST are processed same day</li>
                        <li>Orders placed after 2 PM EST are processed next business day</li>
                        <li>Shipping times are estimates and may vary</li>
                        <li>Weekends and holidays are not included in shipping time calculations</li>
                    </ul>
                </section>

                <section className="shipping-section">
                    <h2>4. Shipping Costs</h2>
                    <ul>
                        <li>Shipping costs are calculated at checkout</li>
                        <li>International shipping costs vary by destination</li>
                        <li>Shipping costs are non-refundable</li>
                    </ul>
                </section>

                <section className="shipping-section">
                    <h2>5. Tracking Your Order</h2>
                    <ul>
                        <li>You will receive a tracking number via email once your order ships</li>
                        <li>Track your order through our website or the carrier's website</li>
                        <li>Contact us if you don't receive a tracking number within 2 business days</li>
                    </ul>
                </section>

                <section className="shipping-section">
                    <h2>6. Delivery Issues</h2>
                    <ul>
                        <li>Contact us immediately if your order is damaged or missing</li>
                        <li>We are not responsible for packages marked as delivered by the carrier</li>
                        <li>Lost packages must be reported to the carrier for claims</li>
                    </ul>
                </section>

                <section className="shipping-section">
                    <h2>7. Returns & Exchanges</h2>
                    <ul>
                        <li>Return shipping costs are the responsibility of the customer</li>
                        <li>Exchanges are subject to availability of the requested item</li>
                        <li>Original shipping costs are non-refundable</li>
                    </ul>
                </section>

                <section className="shipping-section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions about our shipping policy, please contact us at:</p>
                    <p>Email: shipping@cosemecticstore.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                </section>
            </div>
        </div>
    );
};

export default ShippingPolicy;
