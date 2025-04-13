import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:5000/api/orders?page=${currentPage}`;
        
        if (statusFilter) {
          url += `&status=${statusFilter}`;
        }
        
        if (dateFilter) {
          url += `&date=${dateFilter}`;
        }
        
        if (searchQuery) {
          url += `&search=${searchQuery}`;
        }
        
        console.log('Fetching orders from:', url);
        
        const token = localStorage.getItem('token');
        console.log('Using auth token:', token ? 'Token exists' : 'No token found');
        
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Orders API response:', response.data);
        
        setOrders(response.data.orders || []);
        setTotalPages(response.data.pages || 1);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        console.error('Error response:', err.response?.data);
        setError('Failed to load orders. Please try again.');
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [currentPage, statusFilter, dateFilter, searchQuery]);

  // Handle order status update
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // Close modal if open
      if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
    }
  };

  // View order details
  const viewOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      setSelectedOrder(response.data);
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

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Render pagination
  const renderPagination = () => {
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button 
          key={i} 
          className={currentPage === i ? 'active' : ''}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    
    return (
      <div className="pagination">
        <button 
          onClick={goToPrevPage} 
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages}
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
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
                  <span className={`value ${getStatusClass(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="order-info-item">
                  <span className="label">Payment Method:</span>
                  <span className="value">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="order-info-item">
                  <span className="label">Payment Status:</span>
                  <span className={`value ${selectedOrder.isPaid ? 'status-delivered' : 'status-pending'}`}>
                    {selectedOrder.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="customer-info-section">
              <h4>Customer Information</h4>
              <div className="customer-info-grid">
                <div className="customer-info-item">
                  <span className="label">Name:</span>
                  <span className="value">
                    {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}
                  </span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Email:</span>
                  <span className="value">{selectedOrder.user?.email}</span>
                </div>
              </div>
            </div>
            
            <div className="shipping-info-section">
              <h4>Shipping Address</h4>
              <div className="shipping-address">
                <p>{selectedOrder.shippingAddress.fullName}</p>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                </p>
                <p>{selectedOrder.shippingAddress.country}</p>
                <p>Phone: {selectedOrder.shippingAddress.phoneNumber}</p>
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
                      <td className="product-cell">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
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
          </div>
          
          <div className="order-modal-footer">
            <div className="status-update">
              <select 
                value={selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button 
                className="update-status-btn"
                onClick={() => updateOrderStatus(selectedOrder._id, selectedOrder.status)}
              >
                Update Status
              </button>
            </div>
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
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="orders-content">
      <div className="content-header">
        <h2>Order Management</h2>
      </div>
      
      <div className="filter-row">
        <div className="filter-group">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="filter-group">
          <input 
            type="date" 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="orders-table">
        {orders.length === 0 ? (
          <div className="no-orders">
            <i className="fas fa-shopping-cart"></i>
            <p>No orders found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>#{order._id.substring(0, 8)}</td>
                  <td>{order.user?.firstName} {order.user?.lastName}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>Rs. {order.totalPrice.toLocaleString()}</td>
                  <td>{order.isPaid ? 'Paid' : 'Unpaid'}</td>
                  <td>
                    <span className={getStatusClass(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      className="view-btn"
                      onClick={() => viewOrderDetails(order._id)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <div className="status-dropdown">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {renderPagination()}
      {renderOrderModal()}
    </div>
  );
};

export default OrdersManagement;
