import React from 'react';
import './Pages.css';

const PrivacyPolicy = () => {
    return (
        <div className="page-container">
            <h1>Privacy Policy</h1>
            <div className="page-content">
                <section className="policy-section">
                    <h2>Effective Date: April 14, 2025</h2>
                    <p>This Privacy Policy describes how Cosemectic Store collects, uses, and protects your personal information when you use our website.</p>
                </section>

                <section className="policy-section">
                    <h2>Information We Collect</h2>
                    <ul>
                        <li>Personal Information (name, email, shipping address)</li>
                        <li>Payment Information (securely processed by payment providers)</li>
                        <li>Usage Data (website interactions, preferences)</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>How We Use Your Information</h2>
                    <ul>
                        <li>To process and fulfill orders</li>
                        <li>To provide customer support</li>
                        <li>To improve our website and services</li>
                        <li>To send marketing communications (with consent)</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>Information Sharing</h2>
                    <p>We do not sell or share your personal information with third parties except:</p>
                    <ul>
                        <li>Payment processors for transaction processing</li>
                        <li>Shipping providers for order fulfillment</li>
                        <li>Legal authorities when required by law</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>Your Rights</h2>
                    <ul>
                        <li>Access to your personal information</li>
                        <li>Correction of inaccurate information</li>
                        <li>Request deletion of your information</li>
                        <li>Opt-out of marketing communications</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <p>Email: privacy@cosemecticstore.com</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
