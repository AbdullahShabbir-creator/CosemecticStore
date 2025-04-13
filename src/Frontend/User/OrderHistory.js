import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import './OrderHistory.css';
import CreateSampleOrders from './CreateSampleOrders';

const OrderHistory = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders whenever the component mounts and also set up polling for updates
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        console.log('User orders:', data);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again.');
        setLoading(false);
      }
    };

    fetchOrders();

    // Set up polling to check for order status updates every 30 seconds
    const pollingInterval = setInterval(fetchOrders, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(pollingInterval);
  }, [isAuthenticated]);

  const viewOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      
      const data = await response.json();
      setSelectedOrder(data);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching order details:', err);
      alert('Failed to load order details');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Processing': return 'status-processing';
      case 'Shipped': return 'status-shipped';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  // Get status description
  const getStatusDescription = (status) => {
    switch (status) {
      case 'Pending': 
        return 'Your order has been received and is awaiting processing.';
      case 'Processing': 
        return 'Your order is being processed and prepared for shipping.';
      case 'Shipped': 
        return 'Your order has been shipped and is on its way to you!';
      case 'Delivered': 
        return 'Your order has been delivered. Enjoy your products!';
      case 'Cancelled': 
        return 'This order has been cancelled.';
      default: 
        return '';
    }
  };

  // Order details modal
  const renderOrderModal = () => {
    if (!selectedOrder) return null;
    
    return (
      <div className={`order-modal ${isModalOpen ? 'open' : ''}`}>
        <div className="order-modal-content">
          <div className="order-modal-header">
            <h3>Order #{selectedOrder._id.substring(0, 8)}</h3>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="order-modal-body">
            <div className="order-info-section">
              <h4>Order Information</h4>
              <div className="order-info-grid">
                <div className="order-info-item">
                  <span className="label">Order Date:</span>
                  <span className="value">{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className="order-info-item">
                  <span className="label">Status:</span>
                  <span className={`value status-text ${getStatusClass(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="order-info-item">
                  <span className="label">Payment Method:</span>
                  <span className="value">
                    {selectedOrder.paymentMethod || 'Cash on Delivery'}
                  </span>
                </div>
                <div className="order-info-item">
                  <span className="label">Total Amount:</span>
                  <span className="value">Rs. {selectedOrder.totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="status-description">
                <p>{getStatusDescription(selectedOrder.status)}</p>
              </div>
            </div>
            
            <div className="shipping-address-section">
              <h4>Shipping Address</h4>
              <div className="address-details">
                <p>{selectedOrder.shippingAddress.name}</p>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}
                </p>
                <p>{selectedOrder.shippingAddress.country}</p>
                <p>Phone: {selectedOrder.shippingAddress.phone}</p>
              </div>
            </div>
            
            <div className="order-items-section">
              <h4>Order Items</h4>
              <table className="order-items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="product-info">
                          <img src={item.image} alt={item.name} />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td>Rs. {item.price.toLocaleString()}</td>
                      <td>{item.quantity}</td>
                      <td>Rs. {(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="order-summary-section">
              <h4>Order Summary</h4>
              <div className="order-summary">
                <div className="summary-row">
                  <span>Items Total:</span>
                  <span>Rs. {selectedOrder.itemsPrice.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Rs. {selectedOrder.shippingPrice.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>Rs. {selectedOrder.taxPrice.toLocaleString()}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>Rs. {selectedOrder.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {selectedOrder.status === 'Shipped' && (
              <div className="tracking-info-section">
                <h4>Tracking Information</h4>
                <div className="tracking-details">
                  <p>Your order has been shipped and is on its way!</p>
                  {selectedOrder.trackingNumber && (
                    <p>Tracking Number: <strong>{selectedOrder.trackingNumber}</strong></p>
                  )}
                  <div className="delivery-estimate">
                    <p>Estimated Delivery: <strong>{formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}</strong></p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="order-modal-footer">
            <button 
              className="close-modal-btn"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="order-history-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-page">
        <div className="error-container">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <div className="order-history-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <CreateSampleOrders />
      ) : (
        <div className="orders-container">
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <span>Order #:</span>
                    <span>{order._id.substring(0, 8)}</span>
                  </div>
                  <div className="order-date">
                    <span>Placed on:</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>
                
                <div className="order-status">
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                  <p className="status-description">{getStatusDescription(order.status)}</p>
                </div>
                
                <div className="order-summary">
                  <div className="order-items-preview">
                    {order.orderItems.slice(0, 2).map((item, index) => (
                      <div key={index} className="order-item-preview">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                          <p className="item-name">{item.name}</p>
                          <p className="item-quantity">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.orderItems.length > 2 && (
                      <div className="more-items">
                        +{order.orderItems.length - 2} more
                      </div>
                    )}
                  </div>
                  
                  <div className="order-total">
                    <span>Total:</span>
                    <span>Rs. {order.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="order-actions">
                  <button 
                    className="view-details-btn"
                    onClick={() => viewOrderDetails(order._id)}
                  >
                    View Details
                  </button>
                  
                  {order.status === 'Delivered' && (
                    <button className="reorder-btn">
                      Buy Again
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {renderOrderModal()}
    </div>
  );
};

export default OrderHistory;
