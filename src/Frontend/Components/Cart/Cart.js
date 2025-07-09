import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import "./Cart.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const shippingFee = 5.99;
    const tax = cartTotal * 0.05; // 5% tax
    const orderTotal = cartTotal + shippingFee + tax;

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <div className="empty-cart-container">
                    <i className="fa-solid fa-shopping-cart empty-cart-icon"></i>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>

            <div className="cart-container">
                <div className="cart-items-container">
                    <div className="cart-items-header">
                        <span className="header-product">Product</span>
                        <span className="header-price">Price</span>
                        <span className="header-total">Total</span>
                        <span className="header-actions">Actions</span>
                    </div>
                    
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="item-product">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-description">{item.description}</p>
                                    </div>
                                </div>
                                <div className="item-price">${item.price.toFixed(2)}</div>
                                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                                <div className="item-actions">
                                    <div className="quantity-controls-in-actions">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="quantity-btn"
                                            aria-label="Decrease quantity"
                                        >-</button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="quantity-btn"
                                            aria-label="Increase quantity"
                                        >+</button>
                                    </div>
                                    <button 
                                        className="remove-btn" 
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-actions">
                        <button className="clear-cart-btn" onClick={clearCart}>
                            <i className="fa-solid fa-trash"></i> Clear Cart
                        </button>
                        <Link to="/" className="continue-shopping-btn">
                            <i className="fa-solid fa-arrow-left"></i> Continue Shopping
                        </Link>
                    </div>
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-item">
                        <span>Subtotal:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span>Shipping:</span>
                        <span>${shippingFee.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span>Tax (5%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-item total">
                        <span>Total:</span>
                        <span>${orderTotal.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="checkout-btn">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
