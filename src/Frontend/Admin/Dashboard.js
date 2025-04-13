import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    ordersByStatus: {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    },
    salesByMonth: Array(12).fill(0).map((_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      count: 0,
      total: 0
    }))
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [activeTimeframe, setActiveTimeframe] = useState('monthly');

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        // Use try-catch to handle fetch errors
        try {
          const response = await fetch('http://localhost:5000/api/orders/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Dashboard API error:', errorData);
            throw new Error(errorData.error || `Failed to fetch dashboard data: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Dashboard data:', data);
          
          // Make sure we have all the required data
          const safeData = {
            totalOrders: data.totalOrders || 0,
            totalRevenue: data.totalRevenue || 0,
            recentOrders: data.recentOrders || [],
            ordersByStatus: data.ordersByStatus || {
              pending: 0,
              processing: 0,
              shipped: 0,
              delivered: 0,
              cancelled: 0
            },
            salesByMonth: data.salesByMonth || Array(12).fill(0).map((_, i) => ({
              month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
              count: 0,
              total: 0
            }))
          };
          
          setStats(safeData);
          setRecentOrders(safeData.recentOrders);
        } catch (fetchError) {
          console.error('Fetch error:', fetchError);
          throw new Error(`Network error: ${fetchError.message}`);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [isAuthenticated, user]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update order status');
      }
      
      // Update the order in the UI
      setRecentOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      // Show success message
      alert(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating order status:', err);
      alert(`Error updating order status: ${err.message}`);
    }
  };

  // Get total orders by status
  const totalOrdersCount = Object.values(stats.ordersByStatus).reduce((a, b) => a + b, 0);

  // Calculate percentages for status bars
  const getStatusPercentage = (status) => {
    if (totalOrdersCount === 0) return 0;
    return (stats.ordersByStatus[status.toLowerCase()] / totalOrdersCount) * 100;
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <i className="error-icon fa-solid fa-circle-exclamation"></i>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            <i className="fa-solid fa-rotate-right"></i> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name || 'Admin'}! Here's what's happening with your store today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-label">Total Orders</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-money-bill-wave"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-truck"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.ordersByStatus.shipped || 0}</div>
            <div className="stat-label">Orders Shipped</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.ordersByStatus.delivered || 0}</div>
            <div className="stat-label">Orders Delivered</div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-header">
            <div className="chart-title">Sales Overview</div>
            <div className="chart-actions">
              <select 
                value={activeTimeframe} 
                onChange={(e) => setActiveTimeframe(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
          </div>
          <div className="chart-content">
            {/* Sales chart would go here - using a placeholder */}
            <div style={{ 
              height: '100%', 
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 10px'
            }}>
              {stats.salesByMonth.map((month, index) => (
                <div key={index} style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <div style={{ 
                    height: `${Math.max(30, (month.total / (Math.max(...stats.salesByMonth.map(m => m.total)) || 1)) * 250)}px`,
                    width: '20px',
                    backgroundColor: '#e74c3c',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.5s ease',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      position: 'absolute',
                      top: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#2c3e50',
                      color: 'white',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none'
                    }} className="month-tooltip">
                      ${month.total.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ 
                    marginTop: '8px',
                    fontSize: '10px',
                    color: '#6c757d'
                  }}>
                    {month.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="chart-container">
          <div className="chart-header">
            <div className="chart-title">Order Status</div>
          </div>
          <div className="status-chart">
            <div className="status-item">
              <div className="status-color pending"></div>
              <div className="status-label">Pending</div>
              <div className="status-value">{stats.ordersByStatus.pending || 0}</div>
              <div className="status-percent">
                <div 
                  className="status-bar pending" 
                  style={{ width: `${getStatusPercentage('pending')}%` }}
                ></div>
              </div>
            </div>
            
            <div className="status-item">
              <div className="status-color processing"></div>
              <div className="status-label">Processing</div>
              <div className="status-value">{stats.ordersByStatus.processing || 0}</div>
              <div className="status-percent">
                <div 
                  className="status-bar processing" 
                  style={{ width: `${getStatusPercentage('processing')}%` }}
                ></div>
              </div>
            </div>
            
            <div className="status-item">
              <div className="status-color shipped"></div>
              <div className="status-label">Shipped</div>
              <div className="status-value">{stats.ordersByStatus.shipped || 0}</div>
              <div className="status-percent">
                <div 
                  className="status-bar shipped" 
                  style={{ width: `${getStatusPercentage('shipped')}%` }}
                ></div>
              </div>
            </div>
            
            <div className="status-item">
              <div className="status-color delivered"></div>
              <div className="status-label">Delivered</div>
              <div className="status-value">{stats.ordersByStatus.delivered || 0}</div>
              <div className="status-percent">
                <div 
                  className="status-bar delivered" 
                  style={{ width: `${getStatusPercentage('delivered')}%` }}
                ></div>
              </div>
            </div>
            
            <div className="status-item">
              <div className="status-color cancelled"></div>
              <div className="status-label">Cancelled</div>
              <div className="status-value">{stats.ordersByStatus.cancelled || 0}</div>
              <div className="status-percent">
                <div 
                  className="status-bar cancelled" 
                  style={{ width: `${getStatusPercentage('cancelled')}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Orders Section */}
      <div className="recent-orders">
        <div className="section-header">
          <div className="section-title">Recent Orders</div>
          <Link to="/admin/orders" className="view-all">
            View All <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        
        {recentOrders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id}>
                  <td>
                    <div className="order-id">#{order._id.substring(order._id.length - 6)}</div>
                    <div className="order-date">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="order-date">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <div className="order-customer">
                      <div className="customer-avatar">
                        {order.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="customer-name">{order.user?.name || 'Unknown User'}</div>
                        <div className="customer-email">{order.user?.email || 'No email'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="order-amount">${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <div className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </div>
                  </td>
                  <td className="order-actions">
                    <select 
                      className="status-select"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-orders">No recent orders found</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
