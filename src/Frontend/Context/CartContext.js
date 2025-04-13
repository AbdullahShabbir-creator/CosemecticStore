import React, { createContext, useContext, useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(null);
    
    const { isAuthenticated } = useAuth();

    // Generate unique ID for cart items
    const generateUniqueID = (category, originalId) => {
        return `${category}_${originalId}`;
    };

    // Load cart from localStorage on initial load
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cosmeticCart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                }
            }
        } catch (err) {
            console.error('Error parsing cart from localStorage:', err);
            localStorage.removeItem('cosmeticCart');
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cosmeticCart', JSON.stringify(cartItems));
        } catch (err) {
            console.error('Error saving cart to localStorage:', err);
            if (err.name === 'QuotaExceededError') {
                const simplifiedCart = cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category
                }));
                localStorage.setItem('cosmeticCart', JSON.stringify(simplifiedCart));
            }
        }
    }, [cartItems]);

    // Calculate cart total
    const updateCartTotal = () => {
        const total = cartItems.reduce((sum, item) => 
            sum + (parseFloat(item.price) * item.quantity), 0
        );
        setCartTotal(total);
    };

    // Update cart total whenever cart items change
    useEffect(() => {
        updateCartTotal();
    }, [cartItems]);

    // Add item to cart
    const addToCart = (product, category, quantity = 1) => {
        if (!product || !product.id) {
            console.error('Invalid product data:', product);
            return;
        }

        // Generate unique ID for this product
        const uniqueId = generateUniqueID(category, product.id);

        // Format product data
        const productToAdd = {
            ...product,
            id: uniqueId,
            price: typeof product.price === 'string' 
                ? parseFloat(product.price.replace(/[^0-9.]/g, '')) 
                : product.price,
            quantity: quantity,
            category: category
        };

        // Check if product already exists in cart
        const existingItemIndex = cartItems.findIndex(item => item.id === productToAdd.id);
        
        if (existingItemIndex !== -1) {
            // Update existing item's quantity
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                quantity: updatedCart[existingItemIndex].quantity + quantity
            };
            setCartItems(updatedCart);
        } else {
            // Add new item
            setCartItems([...cartItems, productToAdd]);
        }
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    // Update item quantity
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        const updatedCart = cartItems.map(item => 
            item.id === productId 
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCartItems(updatedCart);
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
        setCartTotal(0);
        localStorage.removeItem('cosmeticCart');
    };

    // Create order
    const createOrder = async (shippingAddress) => {
        if (!isAuthenticated) {
            setError('Please login to place an order');
            return;
        }

        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const orderItems = cartItems.map(item => ({
                product: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                category: item.category
            }));

            const itemsPrice = cartTotal;
            const shippingPrice = 5.99;
            const taxPrice = cartTotal * 0.05;
            const totalPrice = itemsPrice + shippingPrice + taxPrice;

            const orderData = {
                orderItems,
                shippingAddress,
                paymentMethod: 'Cash on Delivery',
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            };

            const response = await orderAPI.createOrder(orderData);
            setOrderSuccess(response.data);
            clearCart();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotal,
            loading,
            error,
            orderSuccess,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            createOrder
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
