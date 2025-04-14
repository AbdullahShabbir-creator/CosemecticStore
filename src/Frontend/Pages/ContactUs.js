import React from 'react';
import './Pages.css';

const ContactUs = () => {
    return (
        <div className="page-container">
            <h1>Contact Us</h1>
            <div className="page-content">
                <section className="contact-info">
                    <h2>Get in Touch</h2>
                    <div className="contact-details">
                        <div className="contact-item">
                            <h3>Email</h3>
                            <p>support@cosemecticstore.com</p>
                        </div>
                        <div className="contact-item">
                            <h3>Phone</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="contact-item">
                            <h3>Address</h3>
                            <p>123 Beauty Avenue, Cosmetics City, CC 12345</p>
                        </div>
                    </div>
                </section>

                <section className="contact-form">
                    <h2>Send us a Message</h2>
                    <form className="contact-form-container">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default ContactUs;
