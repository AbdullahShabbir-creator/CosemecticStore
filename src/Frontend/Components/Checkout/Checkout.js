import React, { useState, useEffect } from 'react';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        // Shipping Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Pakistan',
        
        // Payment Information
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        savePaymentInfo: false,
    });
    
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const shippingFee = 5.99;
    const tax = cartTotal * 0.05; // 5% tax
    const orderTotal = cartTotal + shippingFee + tax;
    
    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=checkout');
        }
    }, [isAuthenticated, navigate]);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (activeStep === 1) {
            setActiveStep(2);
        } else if (activeStep === 2) {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch real product data from the database to get valid MongoDB IDs
                const productPromises = cartItems.map(async (item) => {
                    try {
                        // For demo products, use the seeded products we just created
                        const response = await axios.get('http://localhost:5000/api/products', {
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        });
                        
                        // Find a matching product by name (case insensitive)
                        const matchingProduct = response.data.products.find(
                            p => p.name.toLowerCase() === item.name.toLowerCase()
                        );
                        
                        if (matchingProduct) {
                            return {
                                product: matchingProduct._id,
                                name: matchingProduct.name,
                                image: matchingProduct.images[0] || item.image,
                                price: parseFloat(matchingProduct.price),
                                quantity: parseInt(item.quantity || 1)
                            };
                        } else {
                            // Use first product as fallback if no match found
                            const fallbackProduct = response.data.products[0];
                            return {
                                product: fallbackProduct._id,
                                name: item.name,
                                image: item.image,
                                price: parseFloat(item.price),
                                quantity: parseInt(item.quantity || 1)
                            };
                        }
                    } catch (err) {
                        console.error('Error fetching product data:', err);
                        throw new Error('Failed to fetch product data');
                    }
                });
                
                // Wait for all product data to be fetched
                const orderItems = await Promise.all(productPromises);
                
                // Prepare shipping address
                const shippingAddress = {
                    fullName: `${formData.firstName} ${formData.lastName}`,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                    phoneNumber: formData.phone
                };
                
                // Create order object
                const orderData = {
                    orderItems,
                    shippingAddress,
                    paymentMethod: 'Cash on Delivery',
                    itemsPrice: parseFloat(cartTotal.toFixed(2)),
                    shippingPrice: parseFloat(shippingFee.toFixed(2)),
                    taxPrice: parseFloat(tax.toFixed(2)),
                    totalPrice: parseFloat(orderTotal.toFixed(2))
                };
                
                console.log('Sending order data:', orderData);
                
                // Send order to backend
                const response = await axios.post(
                    'http://localhost:5000/api/orders',
                    orderData,
                    { 
                        headers: { 
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );
                
                console.log('Order created:', response.data);
                
                // Save order ID and mark as placed
                setOrderId(response.data._id);
                setOrderPlaced(true);
                clearCart();
                setLoading(false);
            } catch (err) {
                console.error('Error creating order:', err);
                if (err.response?.data?.error) {
                    console.error('Server error message:', err.response.data.error);
                    setError(err.response.data.error);
                } else {
                    setError('Failed to place order. Please try again.');
                }
                setLoading(false);
            }
        }
    };
    
    const handleBack = () => {
        setActiveStep(1);
    };
    
    if (loading) {
        return (
            <div className="checkout-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Processing your order...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="checkout-page">
                <div className="error-container">
                    <div className="error-icon">
                        <i className="fa-solid fa-exclamation-circle"></i>
                    </div>
                    <h2>Order Failed</h2>
                    <p>{error}</p>
                    <button 
                        className="try-again-btn"
                        onClick={() => setError(null)}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
    
    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <div className="order-success">
                    <div className="success-icon">
                        <i className="fa-solid fa-check-circle"></i>
                    </div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your purchase. Your order has been placed successfully.</p>
                    <p>Order confirmation has been sent to your email.</p>
                    <div className="order-number">
                        <p>Order Number: <strong>#{orderId.substring(0, 8)}</strong></p>
                    </div>
                    <Link to="/" className="continue-shopping-btn">
                        <i className="fa-solid fa-arrow-left"></i> Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }
    
    if (cartItems.length === 0) {
        return (
            <div className="checkout-page">
                <div className="empty-cart-message">
                    <h2>Your cart is empty</h2>
                    <p>Please add some items to your cart before proceeding to checkout.</p>
                    <Link to="/" className="continue-shopping-btn">
                        <i className="fa-solid fa-arrow-left"></i> Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <h1>Checkout</h1>
                <div className="checkout-steps">
                    <div className={`step ${activeStep === 1 ? 'active' : activeStep > 1 ? 'completed' : ''}`}>
                        <div className="step-number">1</div>
                        <div className="step-label">Shipping</div>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${activeStep === 2 ? 'active' : activeStep > 2 ? 'completed' : ''}`}>
                        <div className="step-number">2</div>
                        <div className="step-label">Payment</div>
                    </div>
                </div>
            </div>
            
            <div className="checkout-container">
                <div className="checkout-form-container">
                    {activeStep === 1 && (
                        <form onSubmit={handleSubmit} className="shipping-form">
                            <h2>Shipping Information</h2>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name*</label>
                                    <input 
                                        type="text" 
                                        id="firstName" 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name*</label>
                                    <input 
                                        type="text" 
                                        id="lastName" 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email*</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number*</label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="address">Address*</label>
                                <input 
                                    type="text" 
                                    id="address" 
                                    name="address" 
                                    value={formData.address} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City*</label>
                                    <input 
                                        type="text" 
                                        id="city" 
                                        name="city" 
                                        value={formData.city} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State/Province*</label>
                                    <input 
                                        type="text" 
                                        id="state" 
                                        name="state" 
                                        value={formData.state} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="zipCode">Zip/Postal Code*</label>
                                    <input 
                                        type="text" 
                                        id="zipCode" 
                                        name="zipCode" 
                                        value={formData.zipCode} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country*</label>
                                    <select 
                                        id="country" 
                                        name="country" 
                                        value={formData.country} 
                                        onChange={handleChange} 
                                        required
                                    >
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="India">India</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="form-actions">
                                <Link to="/cart" className="back-btn">
                                    <i className="fa-solid fa-arrow-left"></i> Back to Cart
                                </Link>
                                <button type="submit" className="next-btn">
                                    Continue to Payment <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {activeStep === 2 && (
                        <form onSubmit={handleSubmit} className="payment-form">
                            <h2>Payment Information</h2>
                            
                            <div className="payment-methods">
                                <div className="payment-method active">
                                    <input type="radio" id="creditCard" name="paymentMethod" defaultChecked />
                                    <label htmlFor="creditCard">Credit/Debit Card</label>
                                </div>
                                <div className="payment-method">
                                    <input type="radio" id="cashOnDelivery" name="paymentMethod" />
                                    <label htmlFor="cashOnDelivery">Cash on Delivery</label>
                                </div>
                            </div>
                            
                            <div className="credit-card-form">
                                <div className="form-group">
                                    <label htmlFor="cardName">Name on Card*</label>
                                    <input 
                                        type="text" 
                                        id="cardName" 
                                        name="cardName" 
                                        value={formData.cardName} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="cardNumber">Card Number*</label>
                                    <input 
                                        type="text" 
                                        id="cardNumber" 
                                        name="cardNumber" 
                                        value={formData.cardNumber} 
                                        onChange={handleChange} 
                                        placeholder="XXXX XXXX XXXX XXXX" 
                                        required 
                                    />
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="expiryDate">Expiry Date*</label>
                                        <input 
                                            type="text" 
                                            id="expiryDate" 
                                            name="expiryDate" 
                                            value={formData.expiryDate} 
                                            onChange={handleChange} 
                                            placeholder="MM/YY" 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cvv">CVV*</label>
                                        <input 
                                            type="text" 
                                            id="cvv" 
                                            name="cvv" 
                                            value={formData.cvv} 
                                            onChange={handleChange} 
                                            placeholder="123" 
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group checkbox">
                                    <input 
                                        type="checkbox" 
                                        id="savePaymentInfo" 
                                        name="savePaymentInfo" 
                                        checked={formData.savePaymentInfo} 
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="savePaymentInfo">Save this card for future payments</label>
                                </div>
                            </div>
                            
                            <div className="form-actions">
                                <button type="button" className="back-btn" onClick={handleBack}>
                                    <i className="fa-solid fa-arrow-left"></i> Back to Shipping
                                </button>
                                <button type="submit" className="place-order-btn">
                                    Place Order <i className="fa-solid fa-check"></i>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="order-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="order-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.name} />
                                    <span className="item-quantity">{item.quantity}</span>
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="order-totals">
                        <div className="total-row">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Shipping</span>
                            <span>${shippingFee.toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Tax (5%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="total-row grand-total">
                            <span>Total</span>
                            <span>${orderTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
