import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import './AllOrders.css';

const AllOrders = () => {
    const { isAuthenticated } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllOrders = async () => {
            if (!isAuthenticated) {
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await fetch('http://localhost:5000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to fetch orders');
                }

                const data = await response.json();
                if (Array.isArray(data.orders)) {
                    setOrders(data.orders);
                } else {
                    throw new Error('Invalid data format received from server');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllOrders();
    }, [isAuthenticated]);

    if (loading) {
        return <div className="loading-container"><div className="loading-spinner"></div><p>Loading all orders...</p></div>;
    }

    if (error) {
        return <div className="error-container"><p>{error}</p></div>;
    }

    return (
        <div className="all-orders-container">
            <h1>All Orders</h1>
            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id.substring(0, 8)}</td>
                                <td>{order.user?.name || 'N/A'}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                                <td>
                                    <div className="product-list">
                                        {order.orderItems.map(item => (
                                            <div key={item._id || item.product} className="product-list-item">
                                                {item.name} - <strong>Qty:</strong> {item.quantity}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
