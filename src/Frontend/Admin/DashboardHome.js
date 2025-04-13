import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const DashboardHome = ({ stats, loading, error }) => {
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon products">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-details">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orders">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-details">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-details">
            <h3>{stats.pendingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon users">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-details">
            <h3>{stats.totalUsers}</h3>
            <p>Registered Users</p>
          </div>
        </div>
      </div>
      
      <div className="revenue-section">
        <h3>Revenue</h3>
        <div className="revenue-card">
          <h2>Rs. {stats.revenue.toLocaleString()}</h2>
          <p>Total Revenue</p>
        </div>
      </div>
      
      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Sales Overview</h3>
          <div className="chart-placeholder">
            <p>Sales chart will be displayed here</p>
            <small>Showing data for the last 30 days</small>
          </div>
        </div>
        
        <div className="chart-container">
          <h3>Top Selling Products</h3>
          <div className="chart-placeholder">
            <p>Top products chart will be displayed here</p>
            <small>Showing top 5 products by sales volume</small>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-button">
            <i className="fas fa-plus-circle"></i>
            <span>Add Product</span>
          </button>
          <button className="action-button">
            <i className="fas fa-truck"></i>
            <span>Process Orders</span>
          </button>
          <button className="action-button">
            <i className="fas fa-tag"></i>
            <span>Create Promotion</span>
          </button>
          <button className="action-button">
            <i className="fas fa-chart-line"></i>
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
