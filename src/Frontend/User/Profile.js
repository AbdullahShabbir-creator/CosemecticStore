import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sample order data (would come from API in a real app)
  const orders = [
    { id: 'ORD-001', date: '10 Apr 2025', total: 1200, status: 'Delivered' },
    { id: 'ORD-002', date: '25 Mar 2025', total: 850, status: 'Processing' },
    { id: 'ORD-003', date: '15 Feb 2025', total: 2100, status: 'Delivered' }
  ];

  // Sample address data (would come from API in a real app)
  const addresses = [
    {
      id: 1,
      fullName: 'Sarah Khan',
      phoneNumber: '0300-1234567',
      address: 'House #123, Street 5',
      city: 'Lahore',
      state: 'Punjab',
      zipCode: '54000',
      country: 'Pakistan',
      isDefault: true
    }
  ];

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="user-info">
          <div className="user-avatar">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <h3>{user?.firstName} {user?.lastName}</h3>
          <p>{user?.email}</p>
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="admin-link">
              Admin Dashboard
            </Link>
          )}
        </div>
        
        <ul className="profile-nav">
          <li 
            className={activeTab === 'profile' ? 'active' : ''} 
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i> My Profile
          </li>
          <li 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            <i className="fas fa-shopping-bag" to="/orders"></i> My Orders
          </li>
          <li 
            className={activeTab === 'addresses' ? 'active' : ''} 
            onClick={() => setActiveTab('addresses')}
          >
            <i className="fas fa-map-marker-alt"></i> My Addresses
          </li>
          <li 
            className={activeTab === 'wishlist' ? 'active' : ''} 
            onClick={() => setActiveTab('wishlist')}
          >
            <i className="fas fa-heart"></i> My Wishlist
          </li>
          <li onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        </ul>
      </div>
      
      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-details">
            <div className="section-header">
              <h2>My Profile</h2>
              {!editMode ? (
                <button className="edit-button" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              ) : (
                <button className="cancel-button" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              )}
            </div>
            
            {!editMode ? (
              <div className="profile-info">
                <div className="info-group">
                  <label>First Name</label>
                  <p>{user?.firstName}</p>
                </div>
                <div className="info-group">
                  <label>Last Name</label>
                  <p>{user?.lastName}</p>
                </div>
                <div className="info-group">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>
                <div className="info-group">
                  <label>Phone Number</label>
                  <p>{user?.phoneNumber || 'Not provided'}</p>
                </div>
                <div className="info-group">
                  <label>Account Type</label>
                  <p>{user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                      type="text" 
                      id="firstName"
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleChange} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={formData.email}
                    onChange={handleChange} 
                    disabled
                  />
                  <small>Email cannot be changed</small>
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phoneNumber"
                    name="phoneNumber" 
                    value={formData.phoneNumber}
                    onChange={handleChange} 
                  />
                </div>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </form>
            )}
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="orders-section">
            <div className="section-header">
              <h2>My Orders</h2>
            </div>
            
            {orders.length > 0 ? (
              <div className="orders-list">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>Rs. {order.total.toLocaleString()}</td>
                        <td>
                          <span className={`status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button className="view-order-btn">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-shopping-bag"></i>
                <p>You haven't placed any orders yet.</p>
                <Link to="/" className="shop-now-btn">Shop Now</Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'addresses' && (
          <div className="addresses-section">
            <div className="section-header">
              <h2>My Addresses</h2>
              <button className="add-button">
                <i className="fas fa-plus"></i> Add New Address
              </button>
            </div>
            
            {addresses.length > 0 ? (
              <div className="addresses-list">
                {addresses.map(address => (
                  <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                    {address.isDefault && <span className="default-badge">Default</span>}
                    <h3>{address.fullName}</h3>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                    <p>Phone: {address.phoneNumber}</p>
                    <div className="address-actions">
                      <button className="edit-address-btn">Edit</button>
                      {!address.isDefault && (
                        <button className="set-default-btn">Set as Default</button>
                      )}
                      <button className="delete-address-btn">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-map-marker-alt"></i>
                <p>You haven't added any addresses yet.</p>
                <button className="add-address-btn">Add New Address</button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'wishlist' && (
          <div className="wishlist-section">
            <div className="section-header">
              <h2>My Wishlist</h2>
            </div>
            
            <div className="empty-state">
              <i className="fas fa-heart"></i>
              <p>Your wishlist is empty.</p>
              <Link to="/" className="shop-now-btn">Shop Now</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
