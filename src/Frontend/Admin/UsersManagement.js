import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [roleFilter, setRoleFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:5000/api/users?page=${currentPage}`;
        
        if (roleFilter) {
          url += `&role=${roleFilter}`;
        }
        
        if (searchQuery) {
          url += `&search=${searchQuery}`;
        }
        
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setUsers(response.data.users || []);
        setTotalPages(response.data.pages || 1);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again.');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [currentPage, roleFilter, searchQuery]);

  // View user details
  const viewUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Get user's orders
      const ordersResponse = await axios.get(
        `http://localhost:5000/api/users/${userId}/orders`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      setSelectedUser({
        ...response.data,
        orders: ordersResponse.data || []
      });
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
      alert('Failed to load user details');
    }
  };

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      alert('Failed to update user role');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  // User details modal
  const renderUserModal = () => {
    if (!selectedUser) return null;
    
    return (
      <div className={`user-modal ${isModalOpen ? 'open' : ''}`}>
        <div className="user-modal-content">
          <div className="user-modal-header">
            <h3>User Profile</h3>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="user-modal-body">
            <div className="user-profile-section">
              <div className="user-avatar">
                <img 
                  src={selectedUser.profileImage || 'https://via.placeholder.com/100'} 
                  alt={`${selectedUser.firstName} ${selectedUser.lastName}`} 
                />
              </div>
              
              <div className="user-details">
                <h4>{selectedUser.firstName} {selectedUser.lastName}</h4>
                <p className="user-email">{selectedUser.email}</p>
                <p className="user-role">
                  <span className="label">Role:</span>
                  <span className={`value ${selectedUser.role === 'admin' ? 'admin-role' : 'customer-role'}`}>
                    {selectedUser.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </p>
                <p className="user-joined">
                  <span className="label">Joined:</span>
                  <span className="value">{formatDate(selectedUser.createdAt)}</span>
                </p>
                <p className="user-phone">
                  <span className="label">Phone:</span>
                  <span className="value">{selectedUser.phoneNumber || 'Not provided'}</span>
                </p>
              </div>
            </div>
            
            <div className="role-management-section">
              <h4>Role Management</h4>
              <div className="role-controls">
                <select 
                  value={selectedUser.role}
                  onChange={(e) => updateUserRole(selectedUser._id, e.target.value)}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Administrator</option>
                </select>
                <button 
                  className="update-role-btn"
                  onClick={() => updateUserRole(selectedUser._id, selectedUser.role)}
                >
                  Update Role
                </button>
              </div>
            </div>
            
            <div className="user-orders-section">
              <h4>Order History</h4>
              {selectedUser.orders && selectedUser.orders.length > 0 ? (
                <table className="user-orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUser.orders.map(order => (
                      <tr key={order._id}>
                        <td>#{order._id.substring(0, 8)}</td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>Rs. {order.totalPrice.toLocaleString()}</td>
                        <td>
                          <span className={`status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-orders-message">
                  <p>This user has not placed any orders yet.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="user-modal-footer">
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
        <p>Loading users...</p>
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
    <div className="users-content">
      <div className="content-header">
        <h2>User Management</h2>
      </div>
      
      <div className="filter-row">
        <div className="filter-group">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <div className="filter-group">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="users-table">
        {users.length === 0 ? (
          <div className="no-users">
            <i className="fas fa-users"></i>
            <p>No users found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Orders</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>#{user._id.substring(0, 8)}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={user.role === 'admin' ? 'admin-role' : 'customer-role'}>
                      {user.role === 'admin' ? 'Administrator' : 'Customer'}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{user.orderCount || 0}</td>
                  <td className="actions">
                    <button 
                      className="view-btn"
                      onClick={() => viewUserDetails(user._id)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <div className="role-dropdown">
                      <select 
                        value={user.role}
                        onChange={(e) => updateUserRole(user._id, e.target.value)}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Administrator</option>
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
      {renderUserModal()}
    </div>
  );
};

export default UsersManagement;
