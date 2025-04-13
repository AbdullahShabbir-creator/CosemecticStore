import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../Styles/Footer.css";

const Footer = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentYear = new Date().getFullYear();

    // Social media links
    const socialLinks = [
        { id: 1, icon: 'facebook', url: 'https://facebook.com/glowandglamour' },
        { id: 2, icon: 'instagram', url: 'https://instagram.com/glowandglamour' },
        { id: 3, icon: 'twitter', url: 'https://twitter.com/glowandglamour' },
        { id: 4, icon: 'pinterest', url: 'https://pinterest.com/glowandglamour' }
    ];

    // Quick links
    const quickLinks = [
        { id: 1, text: 'About Us', path: '/about' },
        { id: 2, text: 'Contact Us', path: '/contact' },
        { id: 3, text: 'Privacy Policy', path: '/privacy' },
        { id: 4, text: 'Terms & Conditions', path: '/terms' },
        { id: 5, text: 'Shipping Policy', path: '/shipping' }
    ];

    // Product categories
    const categories = [
        { id: 1, text: 'Makeup', path: '/makeup' },
        { id: 2, text: 'Skincare', path: '/skincare' },
        { id: 3, text: 'Hair Care', path: '/haircare' },
        { id: 4, text: 'Beauty Tools', path: '/tools' },
        { id: 5, text: 'Gift Sets', path: '/gifts' }
    ];

    // Handle social media link click
    const handleSocialClick = (url) => {
        window.open(url, '_blank');
    };

    // Handle newsletter subscription
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Here you would typically make an API call to subscribe the user
            // For now, we'll just show a success message
            toast.success('Thank you for subscribing!');
            setEmail('');
        } catch (error) {
            toast.error('Failed to subscribe. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle category click
    const handleCategoryClick = (path) => {
        navigate(path);
    };

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        {/* Company Info */}
                        <div className="footer-col">
                            <h4>Glow and Glamour</h4>
                            <p className="footer-description">
                                Your one-stop destination for premium cosmetics and beauty products.
                                Discover our wide range of makeup, skincare, and hair care products.
                            </p>
                            <div className="social-links">
                                {socialLinks.map(link => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        className="social-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSocialClick(link.url);
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className={`fab fa-${link.icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                {quickLinks.map(link => (
                                    <li key={link.id}>
                                        <Link to={link.path} onClick={() => handleCategoryClick(link.path)}>
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="footer-col">
                            <h4>Product Categories</h4>
                            <ul className="footer-links">
                                {categories.map(category => (
                                    <li key={category.id}>
                                        <Link to={category.path} onClick={() => handleCategoryClick(category.path)}>
                                            {category.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="footer-col">
                            <h4>Newsletter</h4>
                            <p>Stay updated with our latest trends and offers</p>
                            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </form>
                            <div className="payment-methods">
                                <img 
                                    src="https://via.placeholder.com/100x30" 
                                    alt="Payment Methods" 
                                    style={{ width: '100%', maxWidth: '300px', marginTop: '15px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <div className="footer-copyright">
                            <p>&copy; {currentYear} Glow and Glamour. All rights reserved.</p>
                        </div>
                        <div className="footer-policy-links">
                            {quickLinks.map(link => (
                                <Link key={link.id} to={link.path} onClick={() => handleCategoryClick(link.path)}>
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
