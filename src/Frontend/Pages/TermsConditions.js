import React from 'react';
import './Pages.css';

const TermsConditions = () => {
    return (
        <div className="page-container">
            <h1>Terms & Conditions</h1>
            <div className="page-content">
                <section className="terms-section">
                    <h2>Effective Date: April 14, 2025</h2>
                    <p>Please read these Terms & Conditions carefully before using our website.</p>
                </section>

                <section className="terms-section">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing and using our website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.</p>
                </section>

                <section className="terms-section">
                    <h2>2. Account Registration</h2>
                    <ul>
                        <li>You must be at least 18 years old to create an account</li>
                        <li>You must provide accurate and complete information during registration</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>3. Product Information</h2>
                    <ul>
                        <li>All product descriptions and specifications are subject to change without notice</li>
                        <li>Product images are for illustrative purposes only and may not represent exact appearance</li>
                        <li>We reserve the right to modify or discontinue products at any time</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>4. Order Processing</h2>
                    <ul>
                        <li>All orders are subject to availability and confirmation of payment</li>
                        <li>Prices are subject to change without notice</li>
                        <li>We reserve the right to refuse or cancel any order</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>5. Shipping & Delivery</h2>
                    <ul>
                        <li>Shipping costs are calculated based on order weight and destination</li>
                        <li>Delivery times are estimates and may vary</li>
                        <li>We are not responsible for delays due to circumstances beyond our control</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>6. Returns & Refunds</h2>
                    <ul>
                        <li>Items must be returned within 30 days of delivery</li>
                        <li>Items must be in their original condition with all packaging</li>
                        <li>Shipping costs for returns are the responsibility of the customer</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>7. Intellectual Property</h2>
                    <p>All content on our website, including text, images, and product descriptions, is protected by copyright and other intellectual property laws.</p>
                </section>

                <section className="terms-section">
                    <h2>8. Limitation of Liability</h2>
                    <p>We are not liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
                </section>

                <section className="terms-section">
                    <h2>9. Changes to Terms</h2>
                    <p>We reserve the right to modify these Terms & Conditions at any time. Your continued use of the website constitutes acceptance of any changes.</p>
                </section>

                <section className="terms-section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions about these Terms & Conditions, please contact us at:</p>
                    <p>Email: terms@cosemecticstore.com</p>
                </section>
            </div>
        </div>
    );
};

export default TermsConditions;
