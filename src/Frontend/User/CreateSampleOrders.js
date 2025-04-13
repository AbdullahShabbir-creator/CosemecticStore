import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import './CreateSampleOrders.css';

const CreateSampleOrders = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const createSampleOrders = async () => {
    if (!isAuthenticated) {
      setError('You must be logged in to create sample orders');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch('http://localhost:5000/api/orders/create-samples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create sample orders');
      }

      setResult(data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error('Error creating sample orders:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-sample-orders">
      <div className="sample-orders-card">
        <h2>No Orders Found</h2>
        <p>You don't have any orders in your history yet.</p>
        
        <div className="sample-orders-info">
          <p>Would you like to create some sample orders for testing?</p>
          <p>This will add 4 sample orders with different statuses to your account.</p>
        </div>
        
        <button 
          className="create-samples-btn" 
          onClick={createSampleOrders}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-small"></span>
              Creating...
            </>
          ) : (
            'Create Sample Orders'
          )}
        </button>
        
        {error && (
          <div className="sample-orders-error">
            <p>{error}</p>
          </div>
        )}
        
        {result && (
          <div className="sample-orders-success">
            <p>Successfully created {result.count} sample orders!</p>
            <p>Refreshing page...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSampleOrders;
